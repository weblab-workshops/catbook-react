import React, { Component } from "react";
import { Link } from "@reach/router";

class SingleStory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-story">
        <Link to={`/profile/${this.props.story.creator_id}`} className="u-link u-bold">
          {this.props.story.creator_name}
        </Link>
        <p className="Card-storyContent">{this.props.story.content}</p>
      </div>
    );
  }
}

export default SingleStory;
