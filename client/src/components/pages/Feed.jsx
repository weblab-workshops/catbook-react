import React, {useEffect, useState} from "react";
// TODO (step2): import SingleStory
// TODO (step4): import NewStory
// TODO (step6): remove SingleStory import, import Card

const Feed = () => {
  // TODO (step1): define state called "stories" to hold stories

  // TODO (step4): implement a callback function addNewStory that adds a 
  // new story to the stories state
  

  useEffect(() => {
    // TODO (step1): assign HARDCODED dummy values to the stories state
    // a story should be an object of the form: 
    // {
    //   _id: "some random string of letters",
    //   creator_name: "creator name",
    //   content: "story content",
    // }

  }, []);

  return <div>This is the feed!</div>;
  // TODO (step1): render the raw stories data from state--use JSON.stringify(*list*)
  // TODO (step2): render a SingleStory with hardcoded props
  // TODO (step3): map the state to SingleStory components
  // TODO (step4): add in the NewStory component and pass down addStory as a prop
  // TODO (step6): use Card instead of SingleStory, passing down the same props
};

export default Feed;
