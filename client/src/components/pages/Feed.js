import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
// TODO (step2): import SingleStory
// TODO (step4): import NewStory
// TODO (step6): remove SingleStory import, import Card

const Feed = () => {
  // TODO (step1): define state to hold stories

  useEffect(() => {
    // TODO (step1): implement a GET call to retrieve stories,
    // and assign it to state
  }, []);

  return <div>This is the feed!</div>;
  // TODO (step1): render the raw stories data from state
  // TODO (step2): render a SingleStory with hardcoded props
  // TODO (step3): map the state to SingleStory components
  // TODO (step4): add in the NewStory component
  // TODO (step6): use Card instead of SingleStory
};

export default Feed;
