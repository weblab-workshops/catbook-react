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
    setStories([value].concat(stories));
  };

  useEffect(() => {
    // TODO (step3): fetch the comments from the server
    const comment1 = {
      _id: "commentid1",
      creator_name: "Daniel Hong",
      parent: "id1",
      content: "Hi Stanley",
    };
    const comment2 = {
      _id: "commentid2",
      creator_name: "Lucas Bautista",
      parent: "id2",
      content: "I agree!",
    };
    const comment3 = {
      _id: "commentid3",
      creator_name: "Stanley Zhao",
      parent: "id1",
      content: "Hi Daniel",
    };
    const hardcodedComments = [comment1, comment2, comment3];

    setComments(hardcodedComments.filter((comment) => comment.parent === props._id));
  }, []);

  return (
    <div className="Card-container">
      <SingleStory _id={props._id} creator_name={props.creator_name} content={props.content} />
      <CommentsBlock story={props} comments={comments} addNewComment={addNewComment} />
    </div>
  );
};

export default Card;
