import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CatHappiness from "../modules/CatHappiness";

import { get } from "../../utilities"; 
import "../../utilities.css";
import "./Profile.css";

const Profile = () => {
  const [catHappiness, setCatHappiness] = useState(0);
  // TODO (step 5.2): initialize user state

  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  // TODO (step 5.4): fetch user data on page load by making a GET request to "/api/user" and set user state to the server response

  const incrementCatHappiness = () => {
    setCatHappiness(catHappiness + 1);
  };

  return (
    <>
      {/* TODO (step 5.5): conditionally render Loading! if user is undefined */}
      <div
        className="Profile-avatarContainer"
        onClick={() => {
          incrementCatHappiness();
        }}
      >
        <div className="Profile-avatar" />
      </div>
      {/* TODO (step 5.3): update name with name from user data */}
      <h1 className="Profile-name u-textCenter">Shannen Wu</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">
            I am really allergic to cats i don't know why i have a catbook
          </div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Cat Happiness</h4>
          <CatHappiness catHappiness={catHappiness} />
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
          <div id="favorite-cat">corgi</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
