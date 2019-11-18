import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} id of the story
 * @param {import("../pages/Feed").StoryData} data
 */
class SingleStory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-story">
        <span className="u-bold">{this.props.creator_name}</span>
        <p className="Card-storyContent">{this.props.content}</p>
      </div>
    );
  }
}

export default SingleStory;
