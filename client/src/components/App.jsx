import React from "react";
import NavBar from "./modules/NavBar";

import { Outlet } from "react-router-dom";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  // required method: whatever is returned defines what
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
