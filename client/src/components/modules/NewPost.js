import React, { Component } from "react";

import "./NewPost.css";

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.comment && this.props.storyId
      ? this.addComment(this.props.storyId, this.state.value)
      : this.addStory(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="u-flex">
        <input
          type="text"
          placeholder={this.props.comment ? "New Comment" : "New Story"}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPost-input"
        />
        <button
          type="submit"
          className="NewPost-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }

  addStory = (content) => {
    const body = { content: content };
    fetch("/api/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  addComment = (parent, content) => {
    const body = { parent: parent, content: content };
    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
}

export default NewPost;
