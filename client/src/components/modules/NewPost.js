import React, { Component } from "react";

import "./NewPost.css";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit function triggered when this post is submitted
 */
class NewPost extends Component {
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
    this.props.onSubmit &&
      this.props.onSubmit({ storyId: this.props.storyId, value: this.state.value });
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
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
}

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  addComment = ({ storyId: parent, value: content }) => {
    const body = { parent: parent, content: content };
    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  render() {
    return (
      <NewPost storyId={this.props.storyId} defaultText="New Comment" onSubmit={this.addComment} />
    );
  }
}

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewStory extends Component {
  addStory = ({ value: content }) => {
    const body = { content: content };
    fetch("/api/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  render() {
    return <NewPost defaultText="New Story" onSubmit={this.addStory} />;
  }
}

export { NewComment, NewStory };
