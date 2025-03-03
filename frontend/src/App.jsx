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
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <main
        className={`${
          !hideSidebar && "grid grid-cols-[auto_1fr]"
        } transition-colors duration-500 ease-in-out`}
      >
        {!hideSidebar && <Sidebar />}

        <section className="">
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
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
