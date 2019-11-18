import React, { Component } from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput.js";

/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_id
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
    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.props.comments.map((comment) => (
            <SingleComment key={`SingleComment_${comment._id}`} {...comment} />
          ))}
          <NewComment storyId={this.props.story._id} />
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
