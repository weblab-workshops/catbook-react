import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} id of the story
 * @param {import("../pages/Feed").StoryData} data
 */
class Story extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-story">
        <Link to={"/profile/" + this.props.data.creator_id} className="Card-storyUser u-link">
          {this.props.data.creator_name}
        </Link>
        <p className="Card-storyContent">{this.props.data.content}</p>
      </div>
    );
  }
}

export default Story;
