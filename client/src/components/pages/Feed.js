import React, { Component } from "react";
import { get } from "../../utilities";
// TODO (step3): import SingleStory
// TODO (step4): import NewStory
// TODO (step7): remove SingleStory import, import Card

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [
        {
          content: "Hello world!",
          creator_id: "5a590f0a57d115336c0a0079",
          creator_name: "Aaron Sipser",
          _id: "5a591353c26863287c2bd311",
        },
      ],
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
    // TODO (step7): use Card instead of SingleStory
  }
}

export default Feed;
