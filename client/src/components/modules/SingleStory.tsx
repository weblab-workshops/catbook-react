import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 */

export interface Story {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

class SingleStory extends Component<Story> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-story">
        <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold">
          {this.props.creator_name}
        </Link>
        <p className="Card-storyContent">{this.props.content}</p>
      </div>
    );
  }
}

export default SingleStory;
