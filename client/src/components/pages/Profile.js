import React, { useState } from "react";
import CatHappiness from "../modules/CatHappiness.js";
import "../../utilities.css";
import "./Profile.css";

const Profile = () => {
  const [catHappiness, setCatHappiness] = useState(0);

  incrementCatHappiness = () => {
    // TODO Step 2: Implement function to update and maintain state of cat happiness when user clicks on picture
  };

  return (
    <div>
      <div className="Profile-avatarContainer">
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">YOUR NAME HERE</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">
            Extra Challenge: Modify catbook to show a personalized description here!
          </div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Cat Happiness</h4>
          <CatHappiness catHappiness={this.state.catHappiness} />
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
          <div id="favorite-cat">corgi</div>
        </div>
      </div>
      {/** TODO STEP 1:
       *  Insert Cat Happiness component here.
       *  HINT: You probably want to add a new Profile-subContainer to hold the CatHappiness component.
       */}
      <div className="Profile-subContainer u-textCenter">
        <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
        <div id="favorite-cat">corgi</div>
      </div>
    </div>
  );
};

export default Profile;
