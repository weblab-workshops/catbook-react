import React, { useEffect } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";

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
