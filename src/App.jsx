import React from "react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import SignupPages from "./pages/SignupPages";
import LoginPages from "./pages/LoginPages";
import SettingPages from "./pages/SettingPages";
import ProfilePages from "./pages/ProfilePages";
import HomePages from "./pages/HomePages";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser } = useAuthStore();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/signup" element={<SignupPages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/setting" element={<SettingPages />} />
        <Route path="/profile" element={<ProfilePages />} />
      </Routes>
    </div>
  );
}

export default App;
