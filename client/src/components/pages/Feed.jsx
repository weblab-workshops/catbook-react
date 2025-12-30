import React, {useState, useEffect} from "react";
import SingleStory from "../modules/SingleStory";

const Feed = () => {
  // TODO (Step 2): define a state called "stories" to hold stories
  

  useEffect(() => {
    // TODO (Step 2): assign HARDCODED dummy values to the stories state
    // a story should be an object of the form: 
    // {
    //   _id: "some random string of letters",
    //   creator_name: "creator name",
    //   content: "story content",
    // }
    
  }, []);

  // TODO (Step 2): render a SingleStory with hardcoded props
  return <SingleStory _id="test_id" creator_name="Evan" content="test" />;
};

export default Feed;