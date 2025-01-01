import React from "react";
// TODO (step9): import SingleComment and NewComment

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
 */
const CommentsBlock = () => {
  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {/* TODO (step9): render comments */}
      </div>
    </div>
  );
};

export default CommentsBlock;
