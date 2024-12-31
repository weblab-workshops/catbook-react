import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory";
import CommentsBlock from "./CommentsBlock";

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
      parent: "id1",
      content: "comment2",
    };
    const comment3 = {
      _id: "commentid3",
      creator_name: "person3",
      parent: "id1",
      content: "comment3",
    };
    const hardcodedComments = [comment1, comment2, comment3];

    setComments(hardcodedComments);
  }, []);

  return (
    <div className="Card-container">
      <SingleStory _id={props._id} creator_name={props.creator_name} content={props.content} />
      <CommentsBlock storyId={props._id} comments={comments} addNewComment={addNewComment} />
    </div>
  );
};

export default Card;
