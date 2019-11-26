import React, { Component } from "react";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  render() {
    return (
      <nav class="navContainer u-flex">
        <div class="navTitle">Catbook</div>
      </nav>
    );
  }
}

export default NavBar;
