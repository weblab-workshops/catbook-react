import React, { Component } from "react";

import "../modules/Card.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
class SingleStory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

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
