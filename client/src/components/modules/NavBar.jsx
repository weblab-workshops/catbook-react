import React, {useState} from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  // TODO (step 0.1): Add a state to keep track of whether user is logged in 

  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);

    // TODO (step 0.2): Update the state to reflect user logging in 
    
  };

  // TODO (step 0.4): Add a function for handleLogout here


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
          text="signin_with"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
          containerProps= {{'className': "NavBar-link NavBar-login u-inlineBlock"}}
        />
        {/* TODO (step 0.3): Add a logout button here*/}
      </div>
    </nav>
  );
};

export default NavBar;
