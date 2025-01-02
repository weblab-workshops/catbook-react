import React, { useState, useEffect } from "react";
import Card from "../modules/Card";
import { NewStory } from "../modules/NewPostInput";
import { get, post } from "../../utilities";

const Feed = () => {
  const [stories, setStories] = useState([]);

  // updates the stories state so that the new story is added immediately
  const addNewStory = (value) => {
    // TODO (step2): post the new story to the server
    setStories([value].concat(stories));
  }

  useEffect(() => {
    // TODO (step1): fetch the stories from the server
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, []);

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        content={storyObj.content}
      />
    ));
  } else {
    storiesList = <div>No stories!</div>;
  }
  return (
    <div>
      <NewStory addNewStory={addNewStory} />
      {storiesList}
    </div>
  );
};

export default Feed;
