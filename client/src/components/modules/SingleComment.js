import React from "react";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */
const SingleComment = () => {
  return (
    <div className="Card-commentBody">
      <span className="u-bold">{props.creator_name}</span>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;
