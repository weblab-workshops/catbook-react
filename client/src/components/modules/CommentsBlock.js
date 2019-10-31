import React, { Component } from "react";
import SingleComment from "./SingleComment.js";
import NewPost from "./NewPost.js";

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
          <NewPost storyId={this.props.story._id} comment={true} />
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
