"use client";

import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { filterData } from "../../data/data";
import { BACKEND_URL } from "../../constants/api";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import UserCard from "@/components/UserCard";

const AdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [token, setToken] = useState(null); 
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(storedToken);
  }, []);


  useEffect(() => {
    if (!token) return;
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/users`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res?.data?.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, [token]);


  const filteredUsers = useMemo(() => {
    let filteredList = [...users];

    if (filter) {
      filteredList = filteredList.filter((user) =>
        filter === "CreatedAt"
          ? new Date(user.createdAt)
          : user.status === filter || user.role === filter
      );
    }

    if (searchQuery) {
      filteredList = filteredList.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredList;
  }, [filter, searchQuery, users]);


  const handleUpdateRole = async (id, role) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/admin/update-role`,
        { id, role },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res?.data?.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role } : user
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update role");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/admin/update-status`,
        { id, status },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res?.data?.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, status } : user
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(`${BACKEND_URL}/admin/delete-user/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting user");
    }
  };

  return isClient ? (
    <div className="flex items-center justify-start flex-col gap-2 w-full p-3">
      <h1 className="font-bold m-3">User List and Controls</h1>

      <div className="flex-row flex items-center justify-between px-4 gap-3 w-full">
        <div className="flex items-center border-2 rounded-md w-[50%]">
          <input
            type="text"
            placeholder="Search username..."
            className="px-2 py-1 rounded-md w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="flex text-xl gap-1 px-2">
            <IoIosSearch title="search" className="hover:scale-125 cursor-pointer transition-all" />
          </span>
        </div>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border border-black text-sm font-semibold rounded p-1"
        >
          <option value="">All Users</option>
          {filterData.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label} {item.label === "Creation Date" ? "↑" : ""}
            </option>
          ))}
        </select>
      </div>


      <UserCard
        handleDeleteUser={handleDeleteUser}
        users={filteredUsers}
        handleUpdateRole={handleUpdateRole}
        handleUpdateStatus={handleUpdateStatus}
      />
    </div>
  ) : null;
};

export default AdminManagement;
