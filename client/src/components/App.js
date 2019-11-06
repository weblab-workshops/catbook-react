import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import { Router } from "@reach/router";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

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
      // <React.Fragment> is like a <div>, but won't show
      // up in the DOM tree
      <React.Fragment>
        <NavBar />
        <div className="App-container">
          <Router>
            <Feed path="/" {...this.props} userInfo={this.state.userInfo} />
            <Profile path="/profile/" />
            <NotFound default />
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
