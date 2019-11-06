import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import App from "./components/App.js";
import Feed from "./components/pages/Feed.js";
import NotFound from "./components/pages/NotFound.js";
import Profile from "./components/pages/Profile.js";

/**
 * Define "Root", the highest level component,
 * as a Functional Component.
 */
const Root = () => (
  // wrap the "App" component in a Router to
  // ensure routing is handled
  <Router>
    <App path="/">
      <Feed path="/" />
      <Profile path="/profile/" />
      <NotFound default />
    </App>
  </Router>
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<Root />, document.getElementById("root"));

// allows for live updating
module.hot.accept();
