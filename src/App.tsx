import "./App.css";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Onboarding from "./pages/Onboarding";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const completed = useSelector((state: RootState) => state.onboarding.completed);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={completed && isLoggedIn ? <Home /> : <Navigate to="/" replace />} />
        <Route path="/onboarding" element={isLoggedIn ? <Onboarding /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
