import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { socket } from "../../client-socket.js";

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
          {this.props.userId && (
            <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          {this.props.userId ? (
            <GoogleLogout
              clientId="121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
            />
          ) : (
            <GoogleLogin
              clientId="121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={this.props.handleLogin}
            />
          )}
          <Link to="/chat/" className="NavBar-link">
            Chat
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
