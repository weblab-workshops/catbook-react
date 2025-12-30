import React from "react";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */
const SingleComment = (props) => {
  return (
    <div className="Card-commentBody">
      {/* TODO (Step 7.1): render comment creator and content */}
      <span className="u-bold">{/* Render comment creator */}</span>
      <span>{" | " /* + Render comment content*/}</span>
    </div>
  );
};

export default SingleComment;
