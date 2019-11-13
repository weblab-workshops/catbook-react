import React, { Component } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container u-flex">
        <div className="NavBar-title">Catbook</div>
        <div className="NavBar-linkContainer u-flex u-flex-alignCenter">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          <Link to="/profile/" className="NavBar-link">
            Profile
          </Link>
          <Link to="/chat/" className="NavBar-link">
            Chat
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
