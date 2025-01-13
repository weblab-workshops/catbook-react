import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar";
// TODO: Import UserContext by uncommenting:
// import { UserContext } from "../context/UserContext";
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

  // TODO: Move userId state, whoami fetch, login, and logout functions from NavBar.jsx

  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    <>
      {/* TODO: Pass in login and logout functions to <NavBar /> as props */}
      {/* TODO: Wrap everything in a context provider for user context */}
      <NavBar />
      <div className="App-container">
        <Outlet />
      </div>
    </>
  );
};

export default App;
