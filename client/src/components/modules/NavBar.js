import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import { get, post } from "../../utilities";
import "./NavBar.css";

// This identifies your application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // if the user is logged in, save their ID in react state
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);

    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      this.setState({ userId: user._id });
      console.log(user);
    });
  };

  handleLogout = () => {
    console.log("Logged out successfully!");
    this.setState({ userId: null });
    post("/api/logout");
  };

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">Catbook</div>
        <div className="NavBar-linkContainer u-inlineBlock">
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
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
