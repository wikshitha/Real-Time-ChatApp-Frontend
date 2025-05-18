import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


export const useAuth = create((set) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpddatingProfile: false,
    isCheckingAuth: true,

     checkAuth: async ()=> {
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/check`)

            console.log(res.data)
            set({user: res.data.user})

        } catch (error) {
            console.log("Error checking auth", error)
            set({user: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, data)
            set({user: res.data.user})
            toast.success("Account created successfully")
        }catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, data)
            set({user: res.data.user})
            toast.success("Logged in successfully")
        }catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Login failed")
        } finally {
            set({isLoggingIn: false})
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true})
        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/update`, data)
            set({user: res.data.user})
            toast.success("Profile updated successfully")
        }catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "error in updating profile")
        } finally {
            set({isUpdatingProfile: false})
        }
    }
}));

