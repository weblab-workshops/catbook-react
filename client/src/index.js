import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

/**
 * Define "Root", the highest level component,
 * as a Functional Component.
 */
const Root = () => (
  // wrap the "App" component in a Router to
  // ensure routing is handled
  <App />
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<Root />, document.getElementById("root"));

// allows for live updating
module.hot.accept();
