import React, { useState, useEffect } from "react";
import SingleStory from "../modules/SingleStory";

const Feed = () => {
  const [stories, setStories] = useState([]);

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

  return (
    <div>
      {/* TODO (Step 3.2): Replace the following to instead render `storiesList` */}
      <SingleStory _id="test_id" creator_name="Evan" content="test" />
      {JSON.stringify(stories)}
    </div>
  );
};

export default Feed;
