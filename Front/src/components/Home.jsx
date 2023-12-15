import React, { useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import Nav from "./nav";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setIsAuthenticated, user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCookie = () => {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token"));

      if (!cookieValue) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    };
    checkCookie();
  }, []);

  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Nav
        setIsAuthenticated={setIsAuthenticated}
        navigate={navigate}
        user={user}
      />
      <KanbanBoard />
    </div>
  );
};

export default Home;
