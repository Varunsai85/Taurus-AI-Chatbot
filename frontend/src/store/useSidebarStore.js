import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  collapse: JSON.parse(localStorage.getItem("collapse")) || false,

  togggleCollapse: () => {
    set((state) => {
      const newCollapse = !state.collapse;
      localStorage.setItem("collapse", JSON.stringify(newCollapse));
      return { collapse: newCollapse };
    });
  },
}));
