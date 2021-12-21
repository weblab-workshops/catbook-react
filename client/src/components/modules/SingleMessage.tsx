import React from "react";
import { Message } from "../pages/Chatbook";


import "./SingleMessage.css";

type SingleMessageProps = {
  message: Message;
}

const SingleMessage = (props: SingleMessageProps) => {
  return (
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className=" SingleMessage-sender u-bold">{props.message.sender.name + ":"}</span>
      <span className="SingleMessage-content">{props.message.content}</span>
    </div>
  );
};

export default SingleMessage;
