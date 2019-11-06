import React from "react";
// import "@babel/polyfill";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.js";

/**
 * Define "Root", the highest level component,
 * as a Functional Component.
 */
const Root = () => (
  // wrap the "App" component in a BrowserRouter to
  // ensure routing is handled
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<Root />, document.getElementById("root"));

// allows for live updating
module.hot.accept();
