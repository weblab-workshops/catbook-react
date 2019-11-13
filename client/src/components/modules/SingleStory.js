import React, { Component } from "react";
import { Link } from "@reach/router";

class SingleStory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-story">
        <span className="u-bold">{this.props.data.creator_name}</span>
        <p className="Card-storyContent">{this.props.data.content}</p>
      </div>
    );
  }
}

export default SingleStory;
