import React, { Component } from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput.js";

class CommentsBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.props.comments.map((comment) => (
            <SingleComment key={`SingleComment_${comment._id}`} data={comment} />
          ))}
          <NewComment storyId={this.props.story._id} />
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
