"use client"

import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { filterData } from "../../data/data";
import API, { BACKEND_URL } from "../../constants/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserCard from "@/components/UserCard";

const AdminManagment = () => {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);



  const handleUpdateRole = async (id, role) => {
    const token = localStorage.getItem("token") || "";
    try {
      const res = await axios.put(
        `${BACKEND_URL}/admin/update-role`,
        { id, role },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserRole(res?.data?.data?.role);
      toast.success(res?.data?.message);
      fetchAllUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update role");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const token = localStorage.getItem("token") || "";
    try {
      const res = await axios.put(
        `${BACKEND_URL}/admin/update-status`,
        { id, status },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserStatus(res?.data?.data?.status);
      toast.success(res?.data?.message);
      fetchAllUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token") || "";
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/admin/delete-user/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setUsers(users.filter((user) => user._id !== id));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error deleting user");
      }
    }
  };

  const handleFilterData = (value) => {
    let filteredList = [...users];

    if (value === "Active") {
      filteredList = users.filter((user) => user.status === "Active");
    } else if (value === "InActive") {
      filteredList = users.filter((user) => user.status === "InActive");
    } else if (value === "User") {
      filteredList = users.filter((user) => user.role === "User");
    } else if (value === "Admin") {
      filteredList = users.filter((user) => user.role === "Admin");
    } else if (value === "CreatedAt") {
      filteredList = [...users].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredUsers(filteredList);
  };

  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const res = await axios.get(`${BACKEND_URL}/admin/users`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res?.data?.data || []);
      setFilteredUsers(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [userRole, userStatus]);

  return (
    <div className="flex items-center justify-start flex-col gap-2 w-[100vw] p-3">
      <h1 className="font-bold m-3">User List and Controls</h1>

      <div className="flex-row flex items-center justify-between px-4 gap-3 w-[100vw]">
        <div className="flex items-center justify-between gap-2 pr-2 border-2 rounded-md w-[50%]">
          <input
            type="text"
            placeholder="Search username..."
            className="px-2 py-1 rounded-md w-[100%]"
          />
          <span className="flex text-xl gap-1">
            <IoIosSearch title="search" className="hover:scale-125 cursor-pointer transition-all" />
          </span>
        </div>

        <select
          name="status"
          id="status"
          onChange={(e) => handleFilterData(e.target.value)}
          className="border border-black text-sm font-semibold rounded p-1"
        >
          {filterData.map((item, index) => (
            <option className="bg-slate-100 px-2 font-semibold hover:bg-slate-200" key={index} value={item.value}>
              {item.label} {item.label === "Creation Date" ? "↑" : ""}
            </option>
          ))}
        </select>
      </div>

      <UserCard
        handleDeleteUser={handleDeleteUser}
        users={filteredUsers}
        userRole={userRole}
        setUserRole={setUserRole}
        handleUpdateRole={handleUpdateRole}
        handleUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AdminManagment;
