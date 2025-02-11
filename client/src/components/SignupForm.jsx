"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { createUserSchema } from "@/schemas/schema";
import Link from "next/link";

const SignupForm = ({ addUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter(); 

  const handleSignup = async (values) => {
    const response = await addUser(values);
    
    if (response.success) {
      toast.success(response.message);
      response?.data?.role === "Admin" ? router.push("/") : router.push("/user");
    } else {
      toast.error(response.message);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: createUserSchema,
    onSubmit: handleSignup,
  });

  return (
    <div className="w-full bg-slate-200 max-w-md mx-auto border p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="font-semibold">Username</label>
        <input
          type="text"
          name="userName"
          placeholder="Enter name"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="p-2 border rounded w-full"
        />
        {errors.userName && touched.userName && <span className="text-red-500 text-xs">{errors.userName}</span>}

        <label className="font-semibold">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="p-2 border rounded w-full"
        />
        {errors.email && touched.email && <span className="text-red-500 text-xs">{errors.email}</span>}

        <label className="font-semibold">Phone</label>
        <input
          type="number"
          name="phone"
          placeholder="Enter Phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="p-2 border rounded w-full"
        />
        {errors.phone && touched.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}

        <label className="font-semibold">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 border rounded w-full"
          />
          <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && touched.password && <span className="text-red-500 text-xs">{errors.password}</span>}

        <label className="font-semibold">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 border rounded w-full"
          />
          <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && touched.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-2 rounded">
          Signup
        </button>

        <span className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="hover:underline font-semibold text-blue-700">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignupForm;
