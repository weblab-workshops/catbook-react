import React, { Component } from "react";
import { Link } from "@reach/router";

class Story extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-story">
        {this.props.data.creator_name}
        <p className="Card-storyContent">{this.props.data.content}</p>
      </div>
    );
  }
}

export default Story;
