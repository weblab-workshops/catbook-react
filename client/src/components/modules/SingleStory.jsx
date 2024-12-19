import React from "react";

// TODO (step2): import Card.css

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const SingleStory = () => {
  return (
    <div className="Card-story">
      This is a SingleStory!
      {/* TODO (step2): use JSX and props to render story creator and content */}
    </div>
  );
};

export default SingleStory;
