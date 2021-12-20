import React from "react";

import "./SingleUser.css";

const SingleUser = (props) => {
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
