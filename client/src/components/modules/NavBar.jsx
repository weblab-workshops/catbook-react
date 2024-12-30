import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { UserContext } from "../App";

import { get, post } from "../../utilities";
import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "395785444978-7b9v7l0ap2h3308528vu1ddnt3rqftjc.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        {userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
