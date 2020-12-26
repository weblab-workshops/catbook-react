import React, { Component } from "react";
import SingleComment, { Comment } from "./SingleComment";
import { NewComment } from "./NewPostInput";
import { Story } from "./SingleStory";

/**
 * Component that holds all the comments for a story
 */

interface Props {
  comments: Comment[];
  userId: string;
  story: Story;
  addNewComment: (comment: Comment) => void;
}

class CommentsBlock extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.props.comments.map((comment) => (
            <SingleComment
              key={`SingleComment_${comment._id}`}
              _id={comment._id}
              creator_name={comment.creator_name}
              creator_id={comment.creator_id}
              content={comment.content}
            />
          ))}
          {this.props.userId && (
            <NewComment storyId={this.props.story._id} addNewComment={this.props.addNewComment} />
          )}
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
