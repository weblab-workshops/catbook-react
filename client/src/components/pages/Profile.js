import React, { Component } from "react";
import LatestPost from "../modules/LatestPost.js";
import ProfilePicture from "../../public/corgi.jpg";
import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  render() {
    const pfpStyle = {
      backgroundImage: `url(${ProfilePicture})`,
    };
    return (
      <div>
        <div className="Profile-avatarContainer">
          <div style={pfpStyle} className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">YOUR NAME HERE</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div className="text" id="profile-description">
              Extra Challenge: Modify catbook to show a personalized description here!
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Latest Post</h4>
            <LatestPost name="YOUR NAME HERE" latestPost="SOME TEXT HERE" id="SOME ID HERE" />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <h3 className="Profile-cat" id="favorite-cat">
              corgi
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
