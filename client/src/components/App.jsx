import React from "react";
import NavBar from "./modules/NavBar";
import Profile from "./pages/Profile";
// TODO (Step 0): import Feed

// To use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    <>
      <NavBar />
      <div className="App-container">
        <Profile />
        {/* TODO (Step 0): render Feed instead of Profile */}
      </div>
    </>
  );
};

export default App;
