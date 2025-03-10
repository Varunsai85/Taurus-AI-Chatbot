import React from "react";
import { Button } from "../ui/button";
import { Sidebar } from "lucide-react";
import { useSidebarStore } from "@/store/useSidebarStore";

const SidebarTrigger = () => {
    const {togggleCollapse}=useSidebarStore();
  return (
    <Button
      variant={"ghost"}
      size={"smResp"}
      onClick={togggleCollapse}
    >
      <Sidebar className="size-5 max-sm:size-4" />
    </Button>
  );
};

export default SidebarTrigger;
