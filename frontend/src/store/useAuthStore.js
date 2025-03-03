import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const useAuthStore = create((set, get) => ({
  userAuth: null,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  isCheckingAuth: false,
  defAvatar:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set((state) => ({ ...state, userAuth: res.data.data.user }));
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set((state) => ({ ...state, userAuth: null }));
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      set((state) => ({ ...state, userAuth: res.data.data.user }));
      toast.success(res.data.message);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "SignUp failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/sign-in", data);
      set((state) => ({ ...state, userAuth: res.data.data.user }));
      toast.success(res.data.message);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  googleLogin: async () => {
    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    } catch (error) {
      console.log("Google login error", error);
      toast.error(
        error.response?.data?.message ||
          "Google login failed. Please try again."
      );
    }
  },

  handleGoogleCallback: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.data) {
        set({ userAuth: res.data.data.user });
        toast.success("Login Successful");
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error(
        error.response?.data?.message ||
          "Google authentication failed. Please try again."
      );
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/sign-out");
      set({ userAuth: null });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));
