import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";

const Feed = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    get("/api/stories").then((storyObjs) => {
      setStories(storyObjs);
    });
  }, []);

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card _id={storyObj._id} creator_name={storyObj.creator_name} content={storyObj.content} />
      ));
  } else {
    storiesList = <div>No stories!</div>;
  }

  return (
    <div>
      <NewStory />
      {storiesList}
    </div>
  );
};

export default Feed;
