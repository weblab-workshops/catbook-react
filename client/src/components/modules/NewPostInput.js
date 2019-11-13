import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

class NewPostInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
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

class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  addComment = (value) => {
    const body = { parent: this.props.storyId, content: value };
    post("/api/comment", body);
  };

  render() {
    return <NewPostInput defaultText="New Comment" onSubmit={this.addComment} />;
  }
}

class NewStory extends Component {
  addStory = (value) => {
    const body = { content: value };
    post("/api/story", body);
  };

  render() {
    return <NewPostInput defaultText="New Story" onSubmit={this.addStory} />;
  }
}

class NewChat extends Component {
  sendMessage = (value) => {
    return;
  };

  render() {
    return <NewPostInput defaultText="New Message" onSubmit={this.sendMessage} />;
  }
}

export { NewComment, NewStory, NewChat };
