import React, { useState, useEffect } from "react";
import SingleStory from "../modules/SingleStory";
// TODO (Step 4.3): import NewStory
// TODO (Step 6): remove SingleStory import, import Card

const Feed = () => {
  const [stories, setStories] = useState([]);

  // TODO (Step 4.1): implement a callback function addNewStory that adds a 
  // new story to the stories state
  

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
      // TODO (Step 6): use Card instead of SingleStory, passing down the same props
      <SingleStory _id="test_id" creator_name={storyObj.creator_name} content={storyObj.content} />
    ));
  } else {
    storiesList = <div>No stories!</div>;
  }

  // TODO (Step 4.3): add in the NewStory component and pass down addStory as a prop
  return (
    <div>
      {storiesList}
    </div>
  );
};

export default Feed;
