import { create } from "zustand";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/users`);
            set({ users: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },
}));