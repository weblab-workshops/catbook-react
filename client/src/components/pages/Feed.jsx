import React, {useState, useEffect} from "react";
import SingleStory from "../modules/SingleStory";
// TODO (step4): import NewStory
// TODO (step6): remove SingleStory import, import Card

const Feed = () => {
  // TODO (step2): define a state called "stories" to hold stories

  // TODO (step4): implement a callback function addNewStory that adds a 
  // new story to the stories state
  

  useEffect(() => {
    // TODO (step2): assign HARDCODED dummy values to the stories state
    // a story should be an object of the form: 
    // {
    //   _id: "some random string of letters",
    //   creator_name: "creator name",
    //   content: "story content",
    // }
    
  }, []);

  return <SingleStory _id="test_id" creator_name="Evan" content="test" />;
  // TODO (step2): render a SingleStory with hardcoded props
  // TODO (step3): map the state to SingleStory components
  // TODO (step4): add in the NewStory component and pass down addStory as a prop
  // TODO (step6): use Card instead of SingleStory, passing down the same props
};

export default Feed;