import React, { Component } from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput.js";
import UserContext from "../UserContext.js";

/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_name
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} story
 */
class CommentsBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userId = this.context;
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
          {userId && (
            <NewComment storyId={this.props.story._id} addNewComment={this.props.addNewComment} />
          )}
        </div>
      </div>
    );
  }
}
CommentsBlock.contextType = UserContext;

export default CommentsBlock;
