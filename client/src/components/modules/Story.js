import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Proptypes of Story component
 * @typedef {Object} StoryData
 * @property {string} creator_id
 * @property {string} creator_name
 * @property {string} content of the story
 */

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} id of the story
 * @param {...StoryData} data
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
