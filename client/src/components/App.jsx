import React from "react";
import NavBar from "./modules/NavBar";

import { Outlet } from "react-router-dom";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

import { get, post } from "../utilities";
import { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
/**
 * Define the "App" component as a function.
 */
const App = () => {
  // required method: whatever is returned defines what
  // shows up on screen

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);

    const userToken = res.credential;
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      setUserId(user._id);
      console.log(user);
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    post("/api/logout");
    setUserId(null);
  };

  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    <>
      <UserContext.Provider value={userId}>
        <NavBar handleLogin={handleLogin} handleLogout={handleLogout} />
        <div className="App-container">
          <Outlet />
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
