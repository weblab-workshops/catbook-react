import React, { useState, useEffect } from "react";
import SingleStory from "../modules/SingleStory";
// TODO (step4): import NewStory
// TODO (step6): remove SingleStory import, import Card

const Feed = () => {
  const [stories, setStories] = useState([]);

  // TODO (step4): implement a callback function addNewStory that adds a 
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

  // TODO (Step 3.1): If there are stories to display, use their data to create
  // a list of SingleStory components. Store these components in `storiesList`. 
  // Otherwise, set `storiesList` as JSX text reporting there are no stories.
  // Hint: Use map() to transform each item in a list

  let storiesList = null;
  // const hasStories = /* TODO (Step 3.1): True if `stories` state is not empty, False otherwise */;

  // TODO (Step 3.2): Render `storiesList`
  return (
    <div>
      <SingleStory _id="test_id" creator_name="Evan" content="test" />
      {JSON.stringify(stories)}
    </div>
  );
  // TODO (step4): add in the NewStory component and pass down addStory as a prop
  // TODO (step6): use Card instead of SingleStory, passing down the same props
};

export default Feed;
