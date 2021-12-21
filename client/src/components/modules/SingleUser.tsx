import React from "react";
import { User } from "../pages/Chatbook";

import "./SingleUser.css";

type SingleUserProps = {
  user: User;
  active: boolean;
  setActiveUser: (user: User) => void;
}

const SingleUser = (props: SingleUserProps) => {
  return (
    <div
      className={`SingleUser-container u-pointer ${
        props.active ? "SingleUser-container--active" : ""
      }`}
      onClick={() => {
        props.setActiveUser(props.user);
      }}
    >
      {props.user.name}
    </div>
  );
};

export default SingleUser;
