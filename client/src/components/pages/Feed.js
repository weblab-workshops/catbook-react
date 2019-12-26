import React, { Component } from "react";
import { get } from "../../utilities";
// TODO (step3): import SingleStory
// TODO (step4): import NewStory
// TODO (step7): remove SingleStory import, import Card

class Feed extends Component {
  constructor(props) {
    super(props);
    // TODO (step1): define state to hold stories
  }

  componentDidMount() {
    // TODO (step1): implement a GET call to retrieve stories,
    // and assign it to state
  }

  render() {
    return <div>This is the feed!</div>;
    // TODO (step1): render the raw stories data from state
    // TODO (step3): map the state to SingleStory components
    // TODO (step4): add in the NewStory component
    // TODO (step7): use Card instead of SingleStory
  }
}

export default Feed;
