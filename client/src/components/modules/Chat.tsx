import React from "react";
import SingleMessage from "./SingleMessage";
import { NewMessage } from "./NewPostInput";
import { ChatData } from "../../types";

import "./Chat.css";

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 */
interface ChatProps {
  data: ChatData;
}

const Chat: React.FC<ChatProps> = (props) => {
  return (
    <div className="u-flexColumn Chat-container">
      <h3>Chatting with {props.data.recipient.name}</h3>
      <div className="Chat-historyContainer">
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
      </div>
      <div className="Chat-newContainer">
        <NewMessage recipient={props.data.recipient} />
      </div>
    </div>
  );
}

export default Chat;
