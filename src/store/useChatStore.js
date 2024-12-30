import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessgesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessgesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isMessgesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
