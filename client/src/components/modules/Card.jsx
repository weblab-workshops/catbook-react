import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput";
// TODO (Step 9.2): import CommentsBlock

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const Card = (props) => {
  const [comments, setComments] = useState([]);

  // updates the comments state so that the new comment is added immediately
  const addNewComment = (comment) => {
    setComments(comments.concat(comment));
  };

  useEffect(() => {
    const comment1 = {
      _id: "commentid1",
      creator_name: "person1",
      parent: "id1",
      content: "comment1",
    };
    const comment2 = {
      _id: "commentid2",
      creator_name: "person2",
      parent: "id2",
      content: "comment2",
    };
    const comment3 = {
      _id: "commentid3",
      creator_name: "person3",
      parent: "id3",
      content: "comment3",
    };
    const hardcodedComments = [comment1, comment2, comment3];

    setComments(hardcodedComments.filter((comment)=>comment.parent==props._id));
  }, []);

  // TODO (Step 9.1): Move the following logic to CommentsBlock.jsx
  let commentsList = null;
  const hasComments = comments.length !== 0;
  if (hasComments) {
    commentsList = comments.map((commentObj) => (
      <SingleComment _id={commentObj._id} creator_name={commentObj.creator_name} content={commentObj.content}/>
    ));
  } else {
    commentsList = <div>No comments!</div>;
  }

  return (
    <div className="Card-container">
      <SingleStory _id={props._id} creator_name={props.creator_name} content={props.content}/>
      {commentsList}
      {/* TODO (Step 9.2): Replace the NewComment component below with CommentsBlock */}
      <NewComment storyId={props._id} addNewComment={addNewComment}/>
    </div>
  )
};

export default Card;