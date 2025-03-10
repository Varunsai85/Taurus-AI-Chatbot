import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useMessageStore } from "@/store/useMessageStore";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const {
    responses,
    sendResponse,
    currentMessageId,
    isResponseLoading,
    getMessages,
  } = useMessageStore();
  const { userAuth, defAvatar } = useAuthStore();
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const validateForm = () => {
    if (formData.prompt.trim().length === 0) {
      toast.error("Prompt can't be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setFormData({ prompt: "" });
        await sendResponse(formData);
        await getMessages();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "prompt failed");
    }
  };

  return (
    <main className="flex flex-col w-full h-screen flex-1">
      <section className="rounded-lg flex-1 relative flex flex-col flex-grow h-full box-border">
        {responses.length !== 0 && currentMessageId && userAuth ? (
          <>
            <div className="p-3 h-full overflow-y-auto space-y-3 px-6">
              {responses.map((response) => (
                <div key={response._id} className="box-border w-full">
                  <div className="flex flex-col box-border gap-3 w-full">
                    {/*Prompt */}
                    <div className="flex items-center gap-1 justify-end w-full">
                      <div className="py-2 px-4 bg-secondary rounded-xl rounded-tr-none max-w-[50%]">
                        {response.prompt}
                      </div>
                      <div className="self-start min-w-5">
                        <img
                          className="object-cover h-5 w-5 rounded-full"
                          src={userAuth?.profilePic || defAvatar}
                          alt={userAuth?.email || "alt"}
                        />
                      </div>
                    </div>
                    {/*Response */}
                    <div className="flex items-center gap-2 w-full">
                      <div className="self-start min-w-5">
                        <img
                          className="object-cover h-5 w-5 rounded-full"
                          src={"/TaurusAI.png"}
                          alt={userAuth?.email || "alt"}
                        />
                      </div>
                      <div className="py-2 px-4 bg-secondary rounded-xl rounded-tl-none max-w-[80%]">
                        {response.response}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-sidebar sticky bottom-0 z-10 p-2 w-full border-t-2">
              <form
                onSubmit={handleSubmit}
                className="rounded-4xl p-2 flex w-full z-10 bg-secondary focus-within:ring-2 focus-within:ring-primary/50"
              >
                <input
                  type="text"
                  placeholder="Ask Anything"
                  className="outline-none w-full p-2"
                  value={formData.prompt}
                  onChange={(e) =>
                    setFormData({ ...formData, prompt: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  className={"rounded-full"}
                  size={"icon"}
                  disabled={isResponseLoading}
                >
                  <ArrowUp className="size-5 font-bold" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center flex-1 h-full">
              <form
                onSubmit={handleSubmit}
                className="rounded-4xl bg-primary/10 p-3 w-[90%] sm:w-[60%] flex focus-within:ring-2 focus-within:ring-primary/50"
              >
                <input
                  type="text"
                  placeholder="Ask Anything"
                  value={formData.prompt}
                  className="outline-none w-full p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, prompt: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  className={"rounded-full"}
                  size={"icon"}
                  disabled={isResponseLoading}
                >
                  <ArrowUp className="size-5 font-bold" />
                </Button>
              </form>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default HomePage;
