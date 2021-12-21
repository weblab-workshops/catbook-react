import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import SingleStory from "../modules/SingleStory.js";
import { NewStory } from "../modules/NewPostInput.js";
// TODO (step6): remove SingleStory import, import Card

const Feed = () => {
  // TODO (step1): define state to hold stories
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
      <SingleStory creator_name={storyObj.creator_name} content={storyObj.content} />
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
  // TODO (step6): use Card instead of SingleStory
};

export default Feed;
