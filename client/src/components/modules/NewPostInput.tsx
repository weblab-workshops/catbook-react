import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";
import { Comment } from "./SingleComment";
import { Story } from "./SingleStory";

/**
 * New Post is a parent component for all input components
 */

interface NewPostInputProps {
  defaultText: string;
  onSubmit: (value: string) => void;
}

interface NewPostInputState {
  value: string;
}

class NewPostInput extends Component<NewPostInputProps, NewPostInputState> {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

/**
 * New Comment is a New Post component for comments
 */

interface NewCommentProps {
  storyId: string;
  addNewComment: (comment: Comment) => void;
}

class NewComment extends Component<NewCommentProps> {
  constructor(props) {
    super(props);
  }

  addComment = (value: string) => {
    const body = { parent: this.props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      this.props.addNewComment(comment);
    });
  };

  render() {
    return <NewPostInput defaultText="New Comment" onSubmit={this.addComment} />;
  }
}

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */

interface NewStoryProps {
  addNewStory: (story: Story) => void;
}

class NewStory extends Component<NewStoryProps> {
  addStory = (value: string) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      this.props.addNewStory(story);
    });
  };

  render() {
    return <NewPostInput defaultText="New Story" onSubmit={this.addStory} />;
  }
}

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */

interface NewMessageProps {
  recipient: { _id: string; name: string };
}

class NewMessage extends Component<NewMessageProps> {
  sendMessage = (value: string) => {
    const body = { recipient: this.props.recipient, content: value };
    post("/api/message", body);
  };

  render() {
    return <NewPostInput defaultText="New Message" onSubmit={this.sendMessage} />;
  }
}

export { NewPostInput, NewComment, NewStory, NewMessage };
