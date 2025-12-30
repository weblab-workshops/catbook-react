import React, { useState, useEffect } from "react";
import SingleStory from "../modules/SingleStory";
import { NewStory } from "../modules/NewPostInput";
// TODO (Step 6.1): remove SingleStory import, import Card

const Feed = () => {
  const [stories, setStories] = useState([]);

  // updates the stories state so that the new story is added immediately
  const addNewStory = (value) => {
    setStories(stories.concat(value));
  }

  useEffect(() => {
    const story1 = {
      _id: "id1",
      creator_name: "person1",
      content: "story1",
    };
    const story2 = {
      _id: "id2",
      creator_name: "person2",
      content: "story2",
    };
    const story3 = {
      _id: "id3",
      creator_name: "person3",
      content: "story3",
    };
    const hardcodedStories = [story1, story2, story3];
    
    setStories(hardcodedStories);
  }, []);

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      // TODO (Step 6.1): use Card instead of SingleStory, passing down the same props
      <SingleStory _id="test_id" creator_name={storyObj.creator_name} content={storyObj.content} />
    ));
  } else {
    storiesList = <div>No stories!</div>;
  }

  return (
    <div>
      <NewStory addNewStory={addNewStory}/>
      {storiesList}
    </div>
  );
};

export default Feed;