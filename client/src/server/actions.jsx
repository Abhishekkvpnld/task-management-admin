"use server";

import API from "../constants/api";


export async function addUser(formData) {
    try {
        const response = await API.post(`/user/addNew`, formData, { withCredentials: true });
        return { success: true, data: response?.data?.data, message: response.data.message };
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || "Signup failed" };
    }
}

export async function loginUser(formData) {
    try {
        const response = await API.post(`/admin/login`, formData, { withCredentials: true });
        return { success: true, message: response.data.message, data: response.data.data };
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || "Login failed" };
    }
}

export async function logoutUser() {
    try {
        const response = await API.get(`/admin/logout`, { withCredentials: true });
        return { success: true, message: response.data.message };
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || "Logout failed" };
    }
}
