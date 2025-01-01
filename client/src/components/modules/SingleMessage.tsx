import React from "react";

import { MessageObject } from "../../types";

import "./SingleMessage.css";

interface SingleMessageProps {
  message: MessageObject;
}

const SingleMessage: React.FC<SingleMessageProps> = (props) => {
  return (
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className=" SingleMessage-sender u-bold">
        {props.message.sender.name + ":"}
      </span>
      <span className="SingleMessage-content">{props.message.content}</span>
    </div>
  );
};

export default SingleMessage;
