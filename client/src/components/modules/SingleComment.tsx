import React from "react";
import { Link } from "react-router-dom";

interface SingleCommentProps {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

const SingleComment: React.FC<SingleCommentProps> = (props) => {
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
