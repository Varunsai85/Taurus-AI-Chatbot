import { useSidebarStore } from "@/store/useSidebarStore";
import SidebarTrigger from "./SidebarTrigger";
import { Loader2, LogOut, PenBox } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import { useMessageStore } from "@/store/useMessageStore";
import { useEffect } from "react";

const Sidebar = () => {
  const { collapse } = useSidebarStore();
  const { userAuth, isCheckingAuth,defAvatar,logout } = useAuthStore();
  const { isMessagesLoading, messages, getMessages,createChat,isCreatingChat } = useMessageStore();

  useEffect(() => {
    if (userAuth) {
      getMessages();
    }
  }, [userAuth]);
  
  useEffect(() => {
    if (!isCreatingChat) {
      getMessages();
    }
  }, [isCreatingChat]);

  return (
    <aside
      className={`text-nowrap transition-[width,padding] ease-in-out duration-500 overflow-hidden box-border bg-sidebar min-h-screen sticky self-start top-0 rounded-br-md ${
        collapse ? "w-0" : "w-[18vw]"
      }`}
      style={{
        boxShadow: "inset -2px -2px 0px rgba(0, 0, 0, 0.2)",
      }}
    >
      <nav className="flex min-w-[18vw] flex-col pt-4 p-2 justify-between min-h-screen">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-center">
            <SidebarTrigger />
            <Button variant={"ghost"} size={"md"} onClick={createChat}>
              <PenBox className="size-5" />
            </Button>
          </div>
          <div className="flex flex-col flex-1">
            {isMessagesLoading ? (
              <div className="flex flex-1 flex-col justify-center items-center gap-3">
                <Loader2 className="animate-spin size-5" />
                <span className="text-primary/50">Loading Chat History</span>
              </div>
            ) : userAuth ? (
              <div className="flex flex-col">
                {messages.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-md hover:bg-primary/5 overflow-ellipsis p-2 overflow-hidden transition-all duration-100 ease-in-out"
                  >
                    {item.responses.length > 0 ? (
                      item.responses[item.responses.length - 1].response
                    ) : (
                      <span>No Responses Yet</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3">
                  <span className="text-primary/50">No Chat History</span>
                  <Link to={"/login"}>
                    <Button>Log In</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-between rounded-2xl bg-primary/5 hover:bg-primary/10 p-2 transition-all duration-500 ease-in-out">
          {isCheckingAuth ? (
            <button className="relative rounded-full overflow-hidden border-2 border-primary/0 hover:border-primary/70 transition-all ease-in-out duration-100 cursor-pointer avatar-overlay">
            <img
              className="object-contain h-9"
              src={userAuth?.profilePic||defAvatar}
              alt={userAuth?.email || "alt"}
            />
            <span className="absolute loader-overlay">
              <Loader2 className="animate-spin size-5" />
            </span>
          </button>
          ) : userAuth&&(
            <>
              <button className="rounded-full overflow-hidden border-2 border-primary/0 hover:border-primary/70 transition-all ease-in-out duration-100 cursor-pointer">
                <img
                  className="object-contain h-9"
                  src={userAuth?.profilePic||defAvatar}
                  alt={userAuth?.email || "alt"}
                />
              </button>
              <Button variant={"outline"} size={"icon"} onClick={logout}>
                <LogOut className="size-4" />
              </Button>
            </>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
