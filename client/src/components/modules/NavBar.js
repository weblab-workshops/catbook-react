import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    fetch("/api/whoami")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.googleid) {
          this.setState({ loggedIn: true });
        }
      });
  }

  handleLogin = (res) => {
    if (!res.profileObj) {
      console.log(res);
      // login failed (e.g. user aborted)
      return;
    }

    this.setState({ loggedIn: true });
    console.log(`Logged in as ${res.profileObj.name}`);

    const token = res.tokenObj.id_token;
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  handleLogout = () => {
    this.setState({ loggedIn: false });
    fetch("/api/logout", {
      method: "POST",
    });
  };

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
          {this.state.loggedIn ? (
            <GoogleLogout
              clientId="121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={this.handleLogout}
            />
          ) : (
            <GoogleLogin
              clientId="121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.handleLogin}
              onFailure={this.handleLogin}
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
