import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">Catbook</div>
        <div className="NavBar-linkContainer">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          {this.props.userInfo === null ? (
            <a className="NavBar-link" href="/auth/google">
              Login
            </a>
          ) : (
            <React.Fragment>
              <Link to={"/profile/" + this.props.userInfo._id} className="NavBar-link">
                Profile
              </Link>
              <a className="NavBar-link" href="/logout" onClick={this.props.logout}>
                Logout
              </a>
            </React.Fragment>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
