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
  const { userAuth, isCheckingAuth, defAvatar, logout } = useAuthStore();
  const {
    isMessagesLoading,
    messages,
    getMessages,
    createChat,
    isCreatingChat,
    selectMessage,
  } = useMessageStore();

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
      className={`text-nowrap transition-[width,padding] ease-in-out duration-500 overflow-hidden box-border bg-primary/0 min-h-screen sticky self-start h-screen top-0 left-0 rounded-br-md overflow-y-scroll ${
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
              messages.length == 0 ? (
                <>
                  <div className="flex-1 flex gap-1 justify-center items-center">
                    Create New Chat
                    <Button variant={"ghost"} size={"md"} onClick={createChat}>
                      <PenBox className="size-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col">
                  {messages.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-md hover:bg-sidebar/90 overflow-ellipsis p-2 overflow-hidden transition-all duration-100 ease-in-out cursor-pointer"
                      onClick={() => selectMessage(item._id)}
                    >
                      {item.responses.length > 0 ? (
                        item.responses[0].response
                      ) : (
                        <span>New Chat</span>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              <>
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <span className="text-primary/50">No Chat History</span>
                  <Link to={"/login"}>
                    <Button>Log In</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={
            userAuth
              ? `flex justify-between rounded-2xl bg-sidebar hover:bg-sidebar/80 p-2`
              : "hidden"
          }
        >
          {isCheckingAuth ? (
            <button className="relative rounded-full overflow-hidden border-2 border-primary/0 hover:border-primary/70 transition-all ease-in-out duration-100 cursor-pointer avatar-overlay">
              <img
                className="object-contain h-9"
                src={userAuth?.profilePic || defAvatar}
                alt={userAuth?.email || "alt"}
              />
              <span className="absolute loader-overlay">
                <Loader2 className="animate-spin size-5" />
              </span>
            </button>
          ) : (
            userAuth && (
              <>
                <button className="rounded-full overflow-hidden border-2 border-primary/0 hover:border-primary/70 transition-all ease-in-out duration-100 cursor-pointer h-9 w-9">
                  <img
                    className="object-cover h-9 w-9 rounded-full"
                    src={userAuth?.profilePic || defAvatar}
                    alt={userAuth?.email || "alt"}
                  />
                </button>
                <Button variant={"outline"} size={"icon"} onClick={logout}>
                  <LogOut className="size-4" />
                </Button>
              </>
            )
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
