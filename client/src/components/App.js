import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";

// to use styles, import the necessary CSS files
import "../utilities.css";
// import "./App.css";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      // <> is like a <div>, but won't show
      // up in the DOM tree
      <>
        <div className="App-container">
          <Router>
            {/* TODO: Your components here */}
            {/* <Feed path="/" /> */}
            <NotFound default />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
