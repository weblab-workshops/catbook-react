import React, { useState, useEffect } from "react";
import CatHappiness from "../modules/CatHappiness";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

import "../../utilities.css";
import "./Profile.css";

interface User {
  name: string;
  // Add other user properties if needed
}

const Profile: React.FC = () => {
  let props = useParams();
  const [catHappiness, setCatHappiness] = useState<number>(0);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    document.title = "Profile Page";
    if (props.userId) {
      get(`/api/user`, { userid: props.userId }).then((userObj: User) => setUser(userObj));
    }
  }, [props.userId]);

  const incrementCatHappiness = () => {
    setCatHappiness(catHappiness + 1);
  };

  if (!user) {
    return <div>Loading!</div>;
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
      <hr className="Profile-linejj" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">
            I am really allergic to cats I don't know why I have a Catbook.
          </div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Cat Happiness</h4>
          <CatHappiness catHappiness={catHappiness} />
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
          <div id="favorite-cat">Corgi</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
