import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "395785444978-7b9v7l0ap2h3308528vu1ddnt3rqftjc.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);

    // TODO: Set a variable 'loggedIn' to react state
  };

  // TODO: Add a function for handleLogout here

  // TODO: Add a logout button
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/profile/" className="NavBar-link">
          Profile
        </Link>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
          className="NavBar-link NavBar-login"
        />
      </div>
    </nav>
  );
};

export default NavBar;
