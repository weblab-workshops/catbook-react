import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

import { Outlet } from "react-router-dom";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";
import { UserObject } from "../types";

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    get("/api/whoami").then((user: UserObject) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res: any) => {
    const userToken = res.credential;
    post("/api/login", { token: userToken }).then((user: UserObject) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    post("/api/logout");
  };

  // required method: whatever is returned defines what
  // shows up on screen
  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <div className="App-container">
        <Outlet context={{ userId }} />
      </div>
    </>
  );
};

export default App;
