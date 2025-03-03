import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/utils/mode-toggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { Loader2, LogOut, PenBox, Sidebar } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import SidebarTrigger from "./SidebarTrigger";

const Navbar = () => {
  const { collapse } = useSidebarStore();
  const { userAuth, logout, isCheckingAuth } = useAuthStore();
  const defAvatar =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

  return (
    <header className="p-3 w-full bg-sidebar">
      <nav className="justify-between flex items-center w-full">
        <div className="flex items-center gap-3 justify-center">
          {collapse && (
            <>
              <SidebarTrigger />
              <Button variant={"ghost"} size={"md"}>
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
            <span>
              <Loader2 className="animate-spin size-5" />
            </span>
          ) : userAuth ? (
            <>
              <button className="rounded-full overflow-hidden border-2 border-primary/0 hover:border-primary/70 transition-all ease-in-out duration-100 cursor-pointer">
                <img
                  className="object-contain h-9"
                  src={userAuth.profilePic || defAvatar}
                  alt={userAuth.email}
                />
              </button>
              <Button variant={"outline"} size={"icon"} onClick={logout}>
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="cursor-pointer">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant={"outline"}>Sign Up</Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
