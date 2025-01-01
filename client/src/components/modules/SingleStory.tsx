import React from "react";
import { Link } from "react-router-dom";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */

interface SingleStoryProps {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

const SingleStory: React.FC<SingleStoryProps> = (props) => {
  return (
    <div className="Card-story">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <p className="Card-storyContent">{props.content}</p>
    </div>
  );
};

export default SingleStory;