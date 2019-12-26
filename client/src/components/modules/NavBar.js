import React, { Component } from "react";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">Catbook</div>
        {/* TODO (step5): implement links to pages */}
      </nav>
    );
  }
}

export default NavBar;
