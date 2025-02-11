import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Server running...🚀");
});

const PORT = process.env.PORT;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...🚀🚀`);
  });
});
