import React, { Component } from "react";
import { post } from "../../utilities";

import "./NewPostInput.css";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
class NewPostInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  componentDidMount() {}

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

/**
 * New Story is a New Post component for stories
 */
class NewStory extends Component {
  constructor(props) {
    super(props);
  }

  addStory = (value) => {
    const body = { content: value };
    // TODO (step10): use .then to call addNewStory
    post("/api/story", body);
  };

  render() {
    return <NewPostInput defaultText="New Story" onSubmit={this.addStory} />;
  }
}

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} storyId to add comment to
 */
class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  addComment = (value) => {
    const body = { parent: this.props.storyId, content: value };
    // TODO (step10): use .then to call addNewComment
    post("/api/comment", body);
  };

  render() {
    return <NewPostInput defaultText="New Comment" onSubmit={this.addComment} />;
  }
}

export { NewComment, NewStory };
