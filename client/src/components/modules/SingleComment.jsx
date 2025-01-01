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
      {/* TODO (step7): render comment creator and content */}
      <span className="u-bold">{/* FILL IN */}</span>
      <span>{" | " /* + FILL IN AND UNCOMMENT*/}</span>
    </div>
  );
};

export default SingleComment;
