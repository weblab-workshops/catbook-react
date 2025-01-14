import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link u-inlineBlock">
            Profile
          </Link>
        )}
        <Link to="/chat/" className="NavBar-link u-inlineBlock">
          Chat
        </Link>
        {/* TODO (Step 0.3): add the Game page to the navbar */}
        {/* Hint: the link to the Game page is "/game/" */}
        {/* Your code goes here */}
        {props.userId ? (
          <button className="NavBar-link NavBar-login u-inlineBlock" onClick={props.handleLogout}>
            Sign out
          </button>
        ) : (
          <GoogleLogin
            text="signin_with"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps= {{'className': "NavBar-link NavBar-login u-inlineBlock"}}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
