import React, { Component } from "react";
import { get } from "../../utilities";
import SingleStory from "../modules/SingleStory.js";
import { NewStory } from "../modules/NewPostInput.js";
// TODO (step7): remove SingleStory import, import Card

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
    return (
      <div>
        <NewStory />
        {storiesList}
      </div>
    );
    // TODO (step7): use Card instead of SingleStory
  }
}

export default Feed;
