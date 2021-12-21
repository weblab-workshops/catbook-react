import React, { useState, useEffect } from "react";
import { SingleStory, Story } from "./SingleStory";
import CommentsBlock from "./CommentsBlock";
import { Comment } from "./SingleComment";
import { get } from "../../utilities";

import "./Card.css";

type CardProps = {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
  userId: string;
};

const Card = (props: CardProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments: Comment[]) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj: Comment) => {
    setComments([...comments, commentObj]);
  };

  return (
    <div className="Card-container">
      <SingleStory
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        content={props.content}
      />
      <CommentsBlock
        story={props}
        comments={comments}
        addNewComment={addNewComment}
        userId={props.userId}
      />
    </div>
  );
};

export default Card;
