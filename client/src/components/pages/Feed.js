import React, { Component } from "react";
import { get } from "../../utilities";
import SingleStory from "../modules/SingleStory.js";
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
    let storiesList = null;
    const hasStories = this.state.stories.length !== 0;
    if (hasStories) {
      storiesList = this.state.stories.map((storyObj) => (
        <SingleStory creator_name={storyObj.creator_name} content={storyObj.content} />
      ));
    } else {
      storiesList = <div>No stories!</div>;
    }
    return <div>{storiesList}</div>;
    // TODO (step4): add in the NewStory component
    // TODO (step6): use Card instead of SingleStory
  }
}

export default Feed;
