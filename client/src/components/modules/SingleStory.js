import React, { Component } from "react";

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
        {/* TODO (step2): use JSX and props to render story creator and content */}
      </div>
    );
  }
}

export default SingleStory;
