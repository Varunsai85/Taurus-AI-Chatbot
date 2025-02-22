import { Toaster } from "react-hot-toast";
import Navbar from "./components/custom/Navbar";
import SideBar from "./components/custom/SideBar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="flex w-full">
        <SideBar />
        <main className="flex flex-col w-full">
          <Navbar />
        </main>
        <Toaster/>
      </div>
    </>
  );
}

export default App;
