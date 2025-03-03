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
    <header className="p-3 w-full bg-sidebar box-border min-h-[5vh] sticky top-0 backdrop-blur-lg">
      <nav className="justify-between flex items-center w-full">
        <div className="flex items-center gap-3 justify-center">
          {collapse && (
            <>
              <SidebarTrigger />
              <Button variant={"ghost"} size={"md"} onClick={createChat}>
                <PenBox className="size-5" />
              </Button>
            </>
          )}

          <Link to="/">
            <span className="flex gap-1">
              <span className="text-xl font-bold">Taurus AI</span>
              <span className="text-xs font-extralight text-primary/50">
                PB Gemini
              </span>
            </span>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-3">
          {isCheckingAuth ? (
            <span>{""}</span>
          ) : (
            !userAuth && (
              <>
                <Link to="/login" className="cursor-pointer">
                  <Button>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant={"outline"}>Sign Up</Button>
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
