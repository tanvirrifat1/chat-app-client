import React, { useEffect } from "react";
import Navbar from "./component/Navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignupPages from "./pages/SignupPages";
import LoginPages from "./pages/LoginPages";
import SettingPages from "./pages/SettingPages";
import ProfilePages from "./pages/ProfilePages";
import HomePages from "./pages/HomePages";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="mx-auto container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePages /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignupPages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/setting" element={<SettingPages />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePages /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
