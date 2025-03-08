import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useMessageStore = create((set,get) => ({
  isMessagesLoading: false,
  isCreatingChat: false,
  isResponseLoading: false,
  currentMessageId:null,
  isSendingPrompt:false,
  messages: [],
  responses: [],

  sendResponse:async(data)=>{
    set({isResponseLoading:true});
    try {
      await axiosInstance.post(`/messages/send/${get().currentMessageId}`,data);
    } catch (error) {
      console.error("Error in sending response",error);
      set({isResponseLoading:false});
    }finally{
      set({isResponseLoading:false});
    }
  },

  selectMessage:(id)=>{
    set((state)=>{
      const selectMessage=state.messages.find((msg)=>msg._id===id);
      return {...state,currentMessageId:id,responses:selectMessage?selectMessage.responses:[]};
    })
  },

  getMessages: async () => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get("/messages/getMessages");
      set((state) => ({ ...state, messages: res.data.data.messages }));
      if (res.data.data.messages.length > 0) {
        set({
          selectedMessageId: res.data.data.messages[0]._id,
          responses: res.data.data.messages[0].responses,
        });
      }
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
