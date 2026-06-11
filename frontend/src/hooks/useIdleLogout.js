import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useIdleLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    const logout = () => {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      sessionStorage.setItem(
        "logoutMessage",
        "Session expired due to inactivity. Please log in again."
      );

      navigate("/login");
    };

    const resetTimer = () => {

      clearTimeout(timeout);

      timeout = setTimeout(
        logout,
        2 * 60 * 1000
      );
    };

    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {

      clearTimeout(timeout);

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };

  }, [navigate]);
}