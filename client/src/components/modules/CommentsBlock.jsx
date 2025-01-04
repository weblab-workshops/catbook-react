import React, { useContext } from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput";
import { UserContext } from "../context/UserContext";

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
const CommentsBlock = (props) => {
  // TODO: Consume userId from UserContext

  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {props.comments.map((comment) => (
          <SingleComment
            key={`SingleComment_${comment._id}`}
            _id={comment._id}
            creator_name={comment.creator_name}
            content={comment.content}
          />
        ))}
        {/* TODO: hide NewComment if userId is null */}
        <NewComment storyId={props.story._id} addNewComment={props.addNewComment} />
      </div>
    </div>
  );
};

export default CommentsBlock;
