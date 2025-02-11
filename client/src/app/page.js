"use client";

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
  const route = useRouter();

  const userData = JSON.parse(localStorage.getItem("user"));

  const handleLogin = async () => {
    route.push("/login");
  };

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res?.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      route.push("/login");
      toast.success(res?.data?.message);
    }
  };

  return (
    <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-5">
      <Link
        href="/new-user"
        className="bg-white hover:bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
      >
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <HiOutlineUserAdd size={25} className="font-bold" />
          Add New User
        </h2>
        <p className="text-gray-600">
          Create a new user account for the system.
        </p>
      </Link>

      <Link
        href="/admin-management"
        className="bg-white hover:bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
      >
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <MdOutlineManageAccounts size={30} />
          Manage Users
        </h2>
        <p className="text-gray-600">View and manage all registered users.</p>
      </Link>

      <Link
        href="/admin-post-manage"
        className="bg-white hover:bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
      >
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <SiManageiq />
          Manage Posts
        </h2>
        <p className="text-gray-600">Assign and update user roles.</p>
      </Link>

      <div className="bg-white hover:bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <TbBrandGoogleAnalytics />
          Analytics
        </h2>
        <p className="text-gray-600">
          View performance metrics and activity logs.
        </p>
      </div>

      <div className="bg-white hover:bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <IoSettingsOutline />
          Settings
        </h2>
        <p className="text-gray-600">
          Update application settings and preferences.
        </p>
      </div>

      {userData ? (
        <button
          onClick={handleLogout}
          className="bg-red-100 hover:bg-red-200 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2 text-red-600 flex items-center gap-2">
            <AiOutlineLogout />
            Logout
          </h2>
          <p className="text-gray-600">End your current session safely.</p>
        </button>
      ) : (
        <Link
          href={"/login"}
          onClick={handleLogin}
          className="bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2 text-green-600 flex items-center gap-2">
            <AiOutlineLogin />
            Login
          </h2>
          <p className="text-gray-600">Start your session securely.</p>
        </Link>
      )}

      <div className="bg-white hover:bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FcSupport />
          Help & Support
        </h2>
        <p className="text-gray-600 mb-4">
          Need assistance? Find FAQs or contact support for help.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}
