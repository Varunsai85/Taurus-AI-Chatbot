import { create } from "zustand";

export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isSigningIn:false,
    isCheckingAuth:true,
}))