import * as yup from "yup";

// Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 5 characters long
const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required"),

  password: yup.string().required("Password is required"),
});

export const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email !")
    .required("Email is required!"),
  password: yup
    .string()
    .min(5)
    .max(12)
    .matches(passwordRule, {
      message:
        "Password must be at least 5 characters long, include an uppercase letter, a lowercase letter, and a number",
    })
    .required("Password is required !"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match !")
    .required(" Confirm password is required !"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required!"),
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required!"),
});