import React from "react";

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
  return (
    <div className="Card-commentSection">
      <div className="story-comments">
      </div>
    </div>
  );
};

export default CommentsBlock;
