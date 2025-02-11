"use client";

import { useState, useEffect } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { FcSupport } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/server/actions";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUserData(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res?.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      toast.success(res?.data?.message || "Logged out successfully!");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-100 min-h-screen">
      {[ 
        { href: "/new-user", icon: <HiOutlineUserAdd size={25} />, title: "Add New User", desc: "Create a new user account." },
        { href: "/admin-management", icon: <MdOutlineManageAccounts size={30} />, title: "Manage Users", desc: "View and manage users." },
        { href: "/admin-post-manage", icon: <SiManageiq size={25} />, title: "Manage Posts", desc: "Assign and update user roles." },
        { icon: <TbBrandGoogleAnalytics size={25} />, title: "Analytics", desc: "View performance metrics." },
        { icon: <IoSettingsOutline size={25} />, title: "Settings", desc: "Update application settings." },
      ].map((item, index) => (
        <Link key={index} href={item.href || "#"} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-start gap-3">
          <div className="text-blue-600 text-3xl">{item.icon}</div>
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-600">{item.desc}</p>
        </Link>
      ))}

      {userData ? (
        <button onClick={handleLogout} className="bg-red-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-start gap-3 cursor-pointer">
          <div className="text-red-600 text-3xl">
            <AiOutlineLogout />
          </div>
          <h2 className="text-xl font-semibold text-red-600">Logout</h2>
          <p className="text-gray-600">End your session.</p>
        </button>
      ) : (
        <Link href="/login" className="bg-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-start gap-3 cursor-pointer">
          <div className="text-green-600 text-3xl">
            <AiOutlineLogin />
          </div>
          <h2 className="text-xl font-semibold text-green-600">Login</h2>
          <p className="text-gray-600">Start your session securely.</p>
        </Link>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-start gap-3">
        <div className="text-blue-600 text-3xl">
          <FcSupport />
        </div>
        <h2 className="text-xl font-semibold">Help & Support</h2>
        <p className="text-gray-600">Find FAQs or contact support.</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Contact Support</button>
      </div>
    </div>
  );
}
