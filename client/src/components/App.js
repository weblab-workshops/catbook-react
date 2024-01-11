import React, { useEffect } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import Profile from "./pages/Profile.js";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";

// To use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  // Lifecycle method: called when component
  // "mounts", i.e. when it shows up on screen
  useEffect(() => {}, []);

  // Required lifecycle method: defines what
  // shows up on screen

  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    <>
      <NavBar />
      <div className="App-container">
        <Router>
          <Feed path="/" />
          <Profile path="profile" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
