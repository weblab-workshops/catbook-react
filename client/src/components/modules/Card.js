import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory.js";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

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
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    // TODO: introduce creator_id
    <div className="Card-container">
      <SingleStory
        _id={this.props._id}
        creator_name={this.props.creator_name}
        content={this.props.content}
      />
      <CommentsBlock
        story={this.props}
        comments={this.state.comments}
        addNewComment={this.addNewComment}
      />
    </div>
  );
};

export default Card;
