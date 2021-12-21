import React, { useState } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

import { Comment } from "./SingleComment";
import { Story } from "./SingleStory";
import {User} from "../pages/Chatbook"

type NewPostInputProps = {
  defaultText: string;
  onSubmit: (value: string) => void;
}

const NewPostInput = (props: NewPostInputProps) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

type NewCommentProps = {
  storyId: string;
  addNewComment: (comment: Comment) => void;
}

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
const NewComment = (props: NewCommentProps) => {
  const addComment = (value: string) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

type NewStoryProps = {
  addNewStory: (story: Story) => void;
}

const NewStory = (props: NewStoryProps) => {
  const addStory = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewStory(story);
    });
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

type NewMessageProps = {
  recipient: User
}

const NewMessage = (props: NewMessageProps) => {
  const sendMessage = (value: string) => {
    const body = { recipient: props.recipient, content: value };
    post("/api/message", body);
  };

  return <NewPostInput defaultText="New Message" onSubmit={sendMessage} />;
};

export { NewPostInput, NewComment, NewStory, NewMessage };
