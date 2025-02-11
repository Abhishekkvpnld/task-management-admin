"use client"

import UserPost from "@/components/UserPost";
import { BACKEND_URL } from "@/constants/api";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineCreateNewFolder } from "react-icons/md";



const page = () => {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const token = localStorage.getItem("token") || "";
        try {
            const res = await axios.get(`${BACKEND_URL}/user/all-posts`,
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res?.data?.success) {
                setPosts(res?.data?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token") || "";
            const res = await axios.delete(`${BACKEND_URL}/admin/delete/${id}`,
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                }
            )

            if(res?.data?.success){
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }


    useEffect(() => {
        fetchPosts()
    }, []);

    return (
        <div className="w-[100vw] min-h-[100vh] bg-slate-100 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Manage Your Tasks</h1>
                <Link href={"/user/create-task"} className="border bg-white rounded-full mr-4 cursor-pointer"><MdOutlineCreateNewFolder size={25} className="m-2 hover:scale-110 transition-all" title="Create" /></Link>
            </div>

            <div className="overflow-scroll h-[100vh] grid grid-cols-3 gap-3 mt-3 px-3">
                {
                    posts.map((data, index) => (
                        <UserPost handleDelete={handleDelete} post={data} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default page;