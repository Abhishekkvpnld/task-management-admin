"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { logoutUser } from "@/server/actions";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            setUserData(storedUser ? JSON.parse(storedUser) : null);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res?.success) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
                router.push("/login");
                toast.success(res?.message || "Logged out successfully!");
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    if (!isClient) return null;

    return (
        <div className="py-1 border-b-2 px-4">
            <div className="mx-auto flex justify-between items-center">
                <Link
                    href={userData?.role === "Admin" ? "/" : "/user"}
                    className="text-xl font-bold tracking-tight text-slate-500 flex items-center justify-center"
                >
                    <span>
                        <img className="rounded-full w-12 h-12" src="/admin.avif" alt="img" />
                    </span>
                    {userData?.role === "Admin" ? "Admin" : "User"}
                </Link>

                <div className="flex gap-5 items-center">
                    {userData ? (
                        <button
                            className="border-red-800 border h-8 px-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="border-black border h-8 px-4 rounded-lg font-semibold hover:text-white hover:bg-blue-500"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
