import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";


export const useAuth = create((set, get) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpddatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    Socket: null,

    checkAuth: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          set({ user: null, isCheckingAuth: false });
          return;
        }
      
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/check`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          set({ user: res.data.user });
          localStorage.setItem("user", JSON.stringify(res.data.user));
          get().connectSocket();
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          set({ user: null });
        } finally {
          set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, data)
            set({user: res.data.user})
            toast.success("Account created successfully")
            get().connectSocket();
        }catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, data);
      
          const user = res.data.user;
          const token = res.data.token;
      
          localStorage.setItem("token", token);               // ✅ store token
          localStorage.setItem("user", JSON.stringify(user)); // ✅ store user
      
          set({ user });                                       // ✅ update Zustand
          toast.success("Logged in successfully");

          get().connectSocket();
        } catch (error) {
          toast.error(error?.response?.data?.message || "Login failed");
        } finally {
          set({ isLoggingIn: false });
        }
      },
      

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        const token = localStorage.getItem("token");
      
        try {
          const res = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/update`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          const updatedUser = res.data.user;
      
          // ✅ Save updated user in Zustand and localStorage
          set({ user: updatedUser });
          localStorage.setItem("user", JSON.stringify(updatedUser));
      
          toast.success("Profile updated successfully");
        } catch (error) {
          toast.error("Error updating profile");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      connectSocket: () => {
        const { user } = get();
        console.log(user);
        if(!user || get().socket?.connected) return

        const socket = io (import.meta.env.VITE_BACKEND_URL);
        socket.connect()

        set({ socket: socket });
      },

      disconnectSocket: () => {
          if(get().socket?.connected) get().socket.disconnect();
      }
      
}));

