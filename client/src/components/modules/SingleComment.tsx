import React from "react";
import { Link } from "@reach/router";

type SingleCommentProps = {
  creator_id: string;
  creator_name: string;
  content: string;
}

type Comment = {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

const SingleComment = (props: SingleCommentProps) => {
  return (
    <div className="Card-commentBody">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export {Comment, SingleComment};
