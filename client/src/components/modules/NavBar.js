import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      console.log(user);
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    if (!res.profileObj) {
      console.log(res);
      // login failed (e.g. user aborted)
      return;
    }

    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then(() => {
      get("/api/whoami").then((user) => {
        this.setState({ userId: user._id });
      });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <nav className="NavBar-container u-flex">
        <div className="NavBar-title">Catbook</div>
        <div className="NavBar-linkContainer u-flex u-flex-alignCenter">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          {this.state.userId && (
            <Link to={`/profile/${this.state.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          {this.state.userId ? (
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
