import React, { Component } from "react";
import CatHappiness from "../modules/CatHappiness.js";
import { NewBio } from "../modules/NewPostInput.js";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";

const { useState, useEffect } = React;

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  const [catHappiness, setCatHappiness] = useState(0);

  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((newUser) => setUser(newUser));
  }, [props.userId]);

  const incrementCatHappiness = () => {
    setCatHappiness(catHappiness + 1);
  };

  if (!user) {
    return <div> Loading! </div>;
  }
  return (
    <>
      <div
        className="Profile-avatarContainer"
        onClick={() => {
          incrementCatHappiness();
        }}
      >
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">{user.name}</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div
            id="profile-description"
            style={{ paddingBottom: "100px" }}
            dangerouslySetInnerHTML={{ __html: user.bio }}
          />
          {user._id === props.self && <NewBio self={props.self} updateUser={setUser} />}
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
