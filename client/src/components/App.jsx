import React, { useEffect } from "react";
import NavBar from "./modules/NavBar";

import { Outlet } from "react-router-dom";

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
        <Outlet/>
      </div>
    </>
  );
};

export default App;
