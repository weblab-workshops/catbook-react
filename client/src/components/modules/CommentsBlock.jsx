import React from "react";
// TODO (Step 9.2): import SingleComment and NewComment

/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_name
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} story
 * @param {({value}) => void} addNewComment: (function) triggered when a comment is submitted, takes {value} as parameters
 */
const CommentsBlock = () => {
  // TODO (Step 9.2): Create list of SingleComment components by moving logic
  // in Card.jsx, lines 50-58 down below

  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {/* TODO (Step 9.2): Render list of SingleComment components*/}
        {/* TODO (Step 9.2): Render NewComment component */}
      </div>
    </div>
  );
};

export default CommentsBlock;
