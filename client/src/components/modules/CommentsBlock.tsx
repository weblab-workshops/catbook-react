import React from "react";
import { SingleComment, Comment} from "./SingleComment";
import { NewComment } from "./NewPostInput";
import {Story} from "./SingleStory";

type CommentsBlockProps = {
  comments: Comment[];
  story: Story;
  userId: string;
  addNewComment: (comment: Comment) => void;
}

const CommentsBlock = (props: CommentsBlockProps) => {
  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {props.comments.map((comment) => (
          <SingleComment
            key={`SingleComment_${comment._id}`}
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
