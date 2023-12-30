import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";

import { get, post } from "../utilities";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  const [userId, setUserId] = useState(null);

  // required method: whatever is returned defines what
  // shows up on screen

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

    const userToken = res.tokenObj.id_token;
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
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <div className="App-container">
        <Router>
          <Feed path="/" userId={userId} />
          <Profile path="/profile/:userId" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
