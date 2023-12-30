import React, { useState, useEffect } from "react";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";

import { get } from "../../utilities";

const Feed = () => {
  const [stories, setStories] = useState([]);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "News Feed";
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewStory = (storyObj) => {
    setStories([storyObj].concat(stories));
  };

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        creator_id={storyObj.creator_id}
        content={storyObj.content}
      />
    ));
  } else {
    storiesList = <div>No stories!</div>;
  }
  return (
    <>
      <NewStory addNewStory={addNewStory} />
      {storiesList}
    </>
  );
};

export default Feed;
