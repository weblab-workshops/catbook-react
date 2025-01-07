import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory";
import CommentsBlock from "./CommentsBlock";
import { get, post } from "../../utilities";

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

  const addNewComment = (comment) => {
    // TODO (step4): post the new comment to the server
    post("/api/comment", comment).then((commentObj) => {
      setComments(comments.concat(commentObj));
    });
  };

  useEffect(() => {
    // TODO (step3): fetch the comments from the server
    get("/api/comments", { parent: props._id }).then((commentsResponse) => {
      setComments(commentsResponse);
    });
  }, []);

  return (
    <div className="Card-container">
      <SingleStory _id={props._id} creator_name={props.creator_name} content={props.content} />
      <CommentsBlock story={props} comments={comments} addNewComment={addNewComment} />
    </div>
  );
};

export default Card;
