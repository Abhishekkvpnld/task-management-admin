"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { useFormik } from "formik";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";
import { loginSchema } from "@/schemas/schema";
import { useRouter } from "next/navigation";
import { loginUser } from "@/server/actions";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const response = await loginUser(values);
    
            if (response?.success) {
                const { token, user } = response.data;
                try {
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                } catch (storageError) {
                    console.error("LocalStorage error:", storageError);
                    toast.error("Unable to store login data.");
                    return;
                }
    
                toast.success(response.message);
    
                router.push(user?.role === "Admin" ? "/" : "/user");
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Try again.");
        }
    
        setLoading(false);
    };
    

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: "admin@gmail.com",
            password: "Admin@123",
        },
        validationSchema: loginSchema,
        onSubmit: handleLogin,
    });

    return loading ? <LoadingPage /> : (
        <div className="mx-auto container p-5 md:w-[50vw] h-[100vh] flex items-center justify-center">
            <div className="border border-gray-300 w-full py-2 mx-auto rounded p-3 shadow-lg">
                <div className="font-bold m-4 text-center">
                    <h1 className="flex items-center gap-3">
                        Welcome Back! Login to Your Account <IoMdLogIn size={30} />
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    {/* Email Field */}
                    <div className="w-full font-semibold">
                        <label htmlFor="email" className="text-slate-500">Email</label>
                        <div className="bg-slate-100 rounded">
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="email"
                                placeholder="Enter email..."
                                className={`w-full h-full outline-none bg-transparent p-2 rounded-md 
                  ${errors.email && touched.email ? "border-red-600 border-2" : "focus:border-gray-500 border-2"} 
                  transition`}
                            />
                        </div>
                        {errors.email && touched.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="w-full font-semibold">
                        <label className="text-slate-500" htmlFor="password">Password</label>
                        <div className={`bg-slate-100 rounded flex items-center 
              ${errors.password && touched.password ? "border-red-600 border-2" : "border-gray-500 border-2"}`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="password"
                                id="password"
                                required
                                placeholder="Enter password..."
                                className="w-full h-full outline-none p-2 rounded-md bg-transparent"
                            />
                            <div className="cursor-pointer mr-2" onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errors.password && touched.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 flex items-center justify-center hover:bg-blue-700 w-full max-w-[150px] rounded text-white p-2 px-6 hover:scale-105 transition-all mt-4"
                    >
                        Login
                    </button>

                    <span className="text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="hover:underline font-semibold text-blue-700">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
