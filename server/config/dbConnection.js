import mongoose from "mongoose";

const dbConnection = async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI_LOCAL,{})
       console.log("server connected to database successfully...💻");

    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnection;