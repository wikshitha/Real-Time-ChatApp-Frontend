import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
  
    getUsers: async () => {
      set({ isUsersLoading: true });
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
      
        set({ users: res.data });
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to fetch users");
      } finally {
        set({ isUsersLoading: false });
      }
    },
  
    getMessages: async (userId) => {
      set({ isMessagesLoading: true });
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        set({ messages: res.data });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch messages");
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    setSelectedUser: (selectedUser) =>set({selectedUser}),
    // sendMessage: async (messageData) => {
    //   const { selectedUser, messages } = get();
    //   try {
    //     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
    //     set({ messages: [...messages, res.data] });
    //   } catch (error) {
    //     toast.error(error.response.data.message);
    //   }
    // },
  
    // subscribeToMessages: () => {
    //   const { selectedUser } = get();
    //   if (!selectedUser) return;
  
    //   const socket = useAuthStore.getState().socket;
  
    //   socket.on("newMessage", (newMessage) => {
    //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
    //     if (!isMessageSentFromSelectedUser) return;
  
    //     set({
    //       messages: [...get().messages, newMessage],
    //     });
    //   });
    // },
  
    // unsubscribeFromMessages: () => {
    //   const socket = useAuthStore.getState().socket;
    //   socket.off("newMessage");
    // },
  
    // setSelectedUser: (selectedUser) => set({ selectedUser }),
  }));
  