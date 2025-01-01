import React from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput";
import { CommentObject } from "../../types";

interface ContentObject {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

interface CommentsBlockProps {
  comments: ContentObject[];
  story: ContentObject;
  userId?: string;
  addNewComment: (comment: CommentObject) => void;
}

const CommentsBlock: React.FC<CommentsBlockProps> = (props) => {
  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {props.comments.map((comment) => (
          <SingleComment
            key={`SingleComment_${comment._id}`}
            _id={comment._id}
            creator_name={comment.creator_name}
            creator_id={comment.creator_id}
            content={comment.content}
          />
        ))}
        {props.userId && (
          <NewComment storyId={props.story._id} addNewComment={props.addNewComment} />
        )}
      </div>
    </div>
  );
};

export default CommentsBlock;
