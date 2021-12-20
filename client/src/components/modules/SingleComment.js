import React from "react";
import { Link } from "@reach/router";

const SingleComment = (props) => {
  return (
    <div className="Card-commentBody">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;
