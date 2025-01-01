import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory";
import CommentsBlock from "./CommentsBlock";
import { get } from "../../utilities";
import { CommentObject } from "../../types";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */

interface CardProps {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
  userId: string;
}

const Card: React.FC<CardProps> = (props) => {
  const [comments, setComments] = useState<CommentObject[]>([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj: CommentObject) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="Card-container">
      <SingleStory
        _id={props._id}
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        content={props.content}
      />
      <CommentsBlock
        story={props}
        comments={comments}
        userId={props.userId}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default Card;
