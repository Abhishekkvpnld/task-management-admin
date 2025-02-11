"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/constants/api";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") || "";
      setToken(storedToken);
    }
  }, []);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/create`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Post created successfully!");
        setFormData({ title: "", description: "", dueDate: "", priority: "" });
      } else {
        toast.error(response.data.message || "Failed to create post.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center flex-col p-4">
      <h1 className="font-bold text-xl mb-4">Create Post</h1>

      <form 
        className="border p-6 w-full max-w-lg bg-slate-200 rounded-md shadow-md" 
        onSubmit={handleSubmit}
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
            aria-label="Title"
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
            aria-label="Description"
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
              aria-label="Due Date"
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
              aria-label="Priority"
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
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Page;
