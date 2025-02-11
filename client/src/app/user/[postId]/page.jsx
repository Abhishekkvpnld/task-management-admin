"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/constants/api";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { postId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  useEffect(() => {
    if (data) {
      setFormData({
        title: data?.title || "",
        description: data?.description || "",
        dueDate: data?.due_date || "",
        priority: data?.priority || "",
      });
    }
  }, [data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/user/post/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.success) {
        setData(res?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching task.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${BACKEND_URL}/user/update/${postId}`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        router.push("/user");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center flex-col p-4">
      <h1 className="font-bold text-xl mb-4">Edit Task</h1>

      <form
        className="border p-6 w-full max-w-lg bg-slate-200 rounded-md shadow-md"
        onSubmit={handleEdit}
      >
        <div className="mb-4">
          <label className="text-sm font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title..."
            className="px-3 w-full py-2 rounded-md border focus:ring focus:ring-green-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
            className="px-3 w-full py-2 rounded-md border h-32 focus:ring focus:ring-green-300"
            required
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-full">
            <label className="text-sm font-semibold">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="px-3 w-full py-2 rounded-md border focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div className="w-full">
            <label className="text-sm font-semibold">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="px-3 w-full py-2 rounded-md border focus:ring focus:ring-green-300"
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-green-700 transition-all w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default Page;
