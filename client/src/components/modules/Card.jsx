import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import SingleStory from "./SingleStory.js";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput";
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

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((commentItems) => {
      setComments(commentItems);
    });
  }, []);

  let commentsList = null;
    const hasComments = comments.length !== 0;
    if (hasComments) {
      commentsList = comments.map((commentObj) => (
        <SingleComment
          _id={commentObj._id}
          creator_name={commentObj.creator_name}
          content={commentObj.content}
        />
      ));
    } else {
      commentsList = <div>No comments!</div>;
    }

  return (
    <div className="Card-container">
        <SingleStory
          _id={props._id}
          creator_name={props.creator_name}
          content={props.content}
        />
        {commentsList}
        <NewComment storyId={props._id} />
      </div>
  )
  // TODO (step9): use CommentsBlock
};

export default Card;