import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SchedulePage from "./pages/SchedulePage";

export default function App() {
  const isUser = localStorage.getItem("loggedInUser");

  const [user, setUser] = useState(isUser?isUser:null);

  useEffect(() => {
    console.log("here -->");
    const loggedUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedUserJson) {
      const userInfo = JSON.parse(loggedUserJson);
      setUser(userInfo.user.user_name);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate replace to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate replace to={"/"} />}
        />
        <Route
          path="/booking"
          element={user ? <BookingPage /> : <Navigate replace to={"/login"} />}
        />
        <Route
          path="/schedule"
          element={user ? <SchedulePage /> : <Navigate replace to={"/login"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
