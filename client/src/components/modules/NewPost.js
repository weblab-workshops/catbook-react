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
    this.props.addStory(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="u-flex">
        <input
          type="text"
          placeholder="New Story"
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

export default NewPost;
