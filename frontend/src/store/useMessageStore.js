import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useMessageStore = create((set, get) => ({
  isMessagesLoading: false,
  isCreatingChat: false,
  isResponseLoading: false,
  currentMessageId: localStorage.getItem("messageId") || null,
  isSendingPrompt: false,
  messages: [],
  responses: [],

  
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
      set((state) => {
        const selectedMessage = state.messages.find((msg) => msg._id === id);
        return {
          currentMessageId: localStorage.getItem("messageId"),
          responses: selectedMessage ? selectedMessage.responses : [],
        };
      });
    } catch (error) {
      console.error("Error selecting message Id:", error);
    }
  },
  
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

  getResponses:async()=>{
    try {
      const res = await axiosInstance.get("/messages/getMessages");
      const messages = res.data.data.messages;
      const currentMsg = messages.find(
        (msg) => msg._id === get().currentMessageId
      );

      set((state) => ({
        ...state,
        responses: currentMsg ? currentMsg.responses : [],
      }));
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  },

  getMessages: async () => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get("/messages/getMessages");
      const messages = res.data.data.messages;
      const currentMsg = messages.find(
        (msg) => msg._id === get().currentMessageId
      );

      set((state) => ({
        ...state,
        messages,
        responses: currentMsg ? currentMsg.responses : [],
      }));
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
