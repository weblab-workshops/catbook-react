import React, { Component } from "react";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  render() {
    return (
      <nav class="NavBar-container">
        <div class="NavBar-title">Catbook</div>
      </nav>
    );
  }
}

export default NavBar;
