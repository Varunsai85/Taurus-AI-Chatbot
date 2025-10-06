import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/utils/mode-toggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { PenBox } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import SidebarTrigger from "./SidebarTrigger";
import { useMessageStore } from "@/store/useMessageStore";

const Navbar = () => {
  const { collapse } = useSidebarStore();
  const { userAuth, isCheckingAuth } = useAuthStore();
  const { createChat } = useMessageStore();

  return (
    <header className="p-3 w-full bg-sidebar/10 box-border min-h-[5vh] sticky top-0 backdrop-blur-[10px] z-30">
      <nav className="justify-between flex items-center w-full">
        <div className="flex items-center sm:gap-3 gap-1 justify-center">
          {collapse && (
            <>
              <SidebarTrigger />
              <Button variant={"ghost"} size={"smResp"} onClick={createChat}>
                <PenBox className="size-5 max-sm:size-4" />
              </Button>
            </>
          )}

          <Link to="/">
            <span className="flex gap-1 items-center">
              <span className="sm:text-xl text-md font-bold">Taurus AI</span>
              <span className="sm:text-xs text-[0px] font-extralight text-primary/50 self-baseline">
                PB Gemini
              </span>
            </span>
          </Link>
        </div>
        <div className="flex justify-center items-center sm:gap-3 gap-1">
          {isCheckingAuth ? (
            <span>{""}</span>
          ) : (
            !userAuth && (
              <>
                <Link to="/login" className="cursor-pointer">
                  <Button size={"mdResp"}>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant={"outline"} size={"mdResp"}>Sign Up</Button>
                </Link>
              </>
            )
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
