import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class SingleStory extends Component {
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
