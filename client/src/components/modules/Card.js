import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import SingleStory from "./SingleStory.js";
import CommentsBlock from "./CommentsBlock.js";

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
    get("/api/comment", { parent: props._id }).then((comments) => {
      this.setState({ comments: comments });
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="Card-container">
      <SingleStory _id={props._id} creator_name={props.creator_name} content={props.content} />
      <CommentsBlock storyId={props._id} comments={comments} addNewComment={addNewComment} />
    </div>
  );
};

export default Card;
