import React, { Component } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
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
        </div>
      </nav>
    );
  }
}

export default NavBar;
