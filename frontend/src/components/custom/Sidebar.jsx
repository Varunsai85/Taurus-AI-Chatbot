import { useSidebarStore } from "@/store/useSidebarStore";
import SidebarTrigger from "./SidebarTrigger";
import { PenBox } from "lucide-react";
import { Button } from "../ui/button";

const Sidebar = () => {
  const { collapse } = useSidebarStore();
  return (
    <aside
      className={`text-nowrap transition-[width,padding] ease-in-out duration-500 overflow-hidden box-border ${
        collapse ? "w-0" : "w-[18vw] border-r-2"
      } bg-sidebar min-h-screen sticky self-start top-0`}
    >
      <nav className="flex flex-col min-w-[5vw] p-3 py-4">
        <div className="flex justify-between items-center">
          <SidebarTrigger />
          <Button variant={"ghost"} size={"md"}>
            <PenBox className="size-5" />
          </Button>
        </div>
        <div>
          //Todo : messages for the prompt
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
