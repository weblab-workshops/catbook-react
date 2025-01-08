import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory";
// TODO (step7): import SingleComment
// TODO (step8): import NewComment
// TODO (step9): import CommentsBlock

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

  // TODO (step8): implement a callback function addNewComment that adds a 
  // new comment to the comments state

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

  return (
    <div className="Card-container">
      <SingleStory _id={props._id} creator_name={props.creator_name} content={props.content}/>
      {JSON.stringify(comments)}
    </div>
  )
  // TODO (step7): map comments from state into SingleComment
  // components (refer to Feed)
  // TODO (step8): add in the NewComment component (refer to Feed)
  // TODO (step9): use CommentsBlock
};

export default Card;
