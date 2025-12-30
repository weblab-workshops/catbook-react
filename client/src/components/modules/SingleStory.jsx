import React from "react";

// TODO (Step 1.2): import Card.css

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const SingleStory = (props) => {
  return (
    <div className="Card-story">
      This is a SingleStory!
      {/* TODO (Step 1.2): Render story creator */}
      {/* TODO (Step 1.2): Render story content */}
    </div>
  );
};

export default SingleStory;
