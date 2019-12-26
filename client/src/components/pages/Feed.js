import React, { Component } from "react";
import { get } from "../../utilities";
// TODO (step3): import SingleStory
// TODO (step4): import NewStory
// TODO (step6): remove SingleStory import, import Card

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  componentDidMount() {
    get("/api/stories").then((storyObjs) => {
      this.setState({ stories: storyObjs });
    });
  }

  render() {
    return <div>{JSON.stringify(this.state.stories)}</div>;
    // TODO (step3): map the state to SingleStory components
    // TODO (step4): add in the NewStory component
    // TODO (step6): use Card instead of SingleStory
  }
}

export default Feed;
