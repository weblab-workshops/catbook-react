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

  return (
    <div>
      <SingleStory _id="test_id" creator_name="Evan" content="test" />
    </div>
  );
  // TODO (step3): map the state to SingleStory components
  // TODO (step4): add in the NewStory component and pass down addStory as a prop
  // TODO (step6): use Card instead of SingleStory, passing down the same props
};

export default Feed;
