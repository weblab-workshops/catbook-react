import React from "react";
import { Link } from "@reach/router";

type Story = {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

type SingleStoryProps = {
  creator_id: string;
  content: string;
  creator_name: string;
}

const SingleStory = (props: SingleStoryProps) => {
  return (
    <div className="Card-story">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <p className="Card-storyContent">{props.content}</p>
    </div>
  );
};

export {Story, SingleStory};
