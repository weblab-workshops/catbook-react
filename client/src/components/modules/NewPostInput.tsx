import React, { useState } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";
import { UserObject } from "../../types";

interface NewPostInputProps {
  defaultText: string;
  storyId?: string;
  onSubmit?: (value: string) => void;
}

const NewPostInput: React.FC<NewPostInputProps> = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
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

interface NewCommentProps {
  storyId: string;
  addNewComment: (comment: any) => void;
}

const NewComment: React.FC<NewCommentProps> = (props) => {
  const addComment = (value: string) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      props.addNewComment(comment);
    });
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

interface NewStoryProps {
  addNewStory: (story: any) => void;
}

const NewStory: React.FC<NewStoryProps> = (props) => {
  const addStory = (value: string) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      props.addNewStory(story);
    });
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

interface NewMessageProps {
  recipient: UserObject;
}

const NewMessage: React.FC<NewMessageProps> = (props) => {
  const sendMessage = (value: string) => {
    const body = { recipient: props.recipient, content: value };
    post("/api/message", body);
  };

  return <NewPostInput defaultText="New Message" onSubmit={sendMessage} />;
};

export { NewComment, NewStory, NewMessage };
