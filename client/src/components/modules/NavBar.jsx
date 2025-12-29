import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { get, post } from "../../utilities";
import "./NavBar.css";

// TODO (8.5.1): Import UserContext by uncommenting:
// import { UserContext } from "../context/UserContext";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  // TODO (step 8.5.2): Consume userId from UserContext

  // TODO (step 8.2.1): Move userId state, whoami fetch, login, and logout functions to App.jsx
  //   (this will be everything between the ///)
  ////////////////////////////

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);

    const userToken = res.credential;
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      setUserId(user._id);
      console.log(user);
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    post("/api/logout");
    setUserId(null);
  };

  ////////////////////////////

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
        {/* TODO (step 8.3.2): Pass in handleLogout and handleLogin as props inherited from App*/}
        {userId ? (
          <button className="NavBar-link NavBar-login u-inlineBlock" onClick={handleLogout}>
            Sign out
          </button>
        ) : (
          <GoogleLogin
            text="signin_with"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
