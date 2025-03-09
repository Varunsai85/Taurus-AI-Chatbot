import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useMessageStore = create((set, get) => ({
  isMessagesLoading: false,
  isCreatingChat: false,
  isResponseLoading: false,
  currentMessageId: null,
  isSendingPrompt: false,
  messages: [],
  responses: [],

  sendResponse: async (data) => {
    set({ isResponseLoading: true });
    try {
      await axiosInstance.post(
        `/messages/send/${get().currentMessageId}`,
        data
      );
    } catch (error) {
      console.error("Error in sending response", error);
      set({ isResponseLoading: false });
    } finally {
      set({ isResponseLoading: false });
    }
  },

  dummyResponse: async () => {
    set({ isResponseLoading: true });
    try {
      await axiosInstance.post("/messages/sendDummy");
    } catch (error) {
      console.error("Error in sending dummy response", error);
      set({ isResponseLoading: false });
    } finally {
      set({ isResponseLoading: false });
    }
  },

  selectMessage: (id) => {
    try {
      localStorage.setItem("messageId", id);
      set((state) => ({ ...state, currentMessageId: localStorage.getItem("messageId") }));
    } catch (error) {
      console.error("Error selecting message Id:", error);
    }
  },

  getMessages: async () => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get("/messages/getMessages");
      set((state) => ({ ...state, messages: res.data.data.messages }));
      const selectedMessage=res.data.data.messages.filter((msg)=>{return msg._id===get().currentMessageId});
      console.log("selected Message:",selectedMessage);
    } catch (error) {
      console.error("Error fetching messages:", error);
      set({ loadingMessages: false });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  createChat: async () => {
    set({ isCreatingChat: true });
    try {
      await axiosInstance.post("/messages/create");
    } catch (error) {
      console.error("Error in creating Chat", error);
      set({ isCreatingChat: false });
    } finally {
      set({ isCreatingChat: false });
    }
  },
}));
