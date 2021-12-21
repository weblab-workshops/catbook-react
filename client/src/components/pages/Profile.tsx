import React, { useState, useEffect } from "react";
import CatHappiness from "../modules/CatHappiness";
import { get } from "../../utilities";
import { User } from "./Chatbook";

import "../../utilities.css";
import "./Profile.css";

type ProfileProps = {
  userId: string;
};

const Profile = (props: ProfileProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [catHappiness, setCatHappiness] = useState(0);

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((user) => setUser(user));
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
          <div id="profile-description">
            Extra Challenge: Modify catbook to show a personalized description here!
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
