import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/custom/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import Sidebar from "./components/custom/Sidebar";
import { useMessageStore } from "./store/useMessageStore";
import NotFound from "./components/custom/NotFound";

function App() {
  const { handleGoogleCallback, checkAuth, userAuth } = useAuthStore();
  const location = useLocation();
  const { getMessages } = useMessageStore();
  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        await handleGoogleCallback();
        window.history.replaceState({}, document.title, "/");
      }
      await checkAuth();
    };
    handleAuth();
  }, []);

  useEffect(() => {
    if (userAuth) {
      getMessages();
    }
  }, [userAuth]);

  const hideSidebar =
    location.pathname!=="/";

  return (
    <>
      <main
        className={`${
          !hideSidebar && "grid sm:grid-cols-[auto_1fr]"
        } transition-colors duration-500 ease-in-out box-border`}
      >
        {!hideSidebar && <Sidebar/>}
        
        <section className="bg-sidebar min-h-screen flex flex-col box-border w-full">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={!userAuth ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!userAuth ? <SignupPage /> : <Navigate to={"/"} />}
            />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
