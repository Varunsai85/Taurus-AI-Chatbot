import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useMessageStore = create((set,get) => ({
  isMessagesLoading: false,
  isCreatingChat:false,
  messages: [],

  getMessages: async () => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get("/messages/getMessages");
      set((state) => ({ ...state, messages: res.data.data.messages }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      set({ loadingMessages: false });
    }finally{
        set({isMessagesLoading:false})
    }
  },

  createChat:async()=>{
    set({isCreatingChat:true})
    try {
      await axiosInstance.post("/messages/create");
    } catch (error) {
      console.error("Error in creating Chat",error);
      set({isCreatingChat:false});
    }finally{
      set({isCreatingChat:false});
    }
  }
}));
