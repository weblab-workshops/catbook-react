import React, { Component } from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPost.js";

/**
 * @typedef CommentsObject
 * @property {string} _id of the comment
 * @property {import("./SingleComment").CommentData} data
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {CommentsObject} comments
 * @param {import("./Card").StoryObject} story
 */
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
