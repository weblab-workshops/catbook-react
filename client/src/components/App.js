import React from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import Form1 from "./pages/Form1.js";
import Form2 from "./pages/Form2.js";
import Form3 from "./pages/Form3.js";


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
        <Router>
          <Feed path="/" />
          <Profile path="/profile/" />
          <Form1 path="/form1/" />
          <Form2 path="/form2/" />
          <Form3 path="/form3/" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
