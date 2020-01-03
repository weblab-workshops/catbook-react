import React, { Component } from "react";
import { get } from "../../utilities";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";

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

  // TODO (step10): implement addNewStory

  render() {
    let storiesList = null;
    const hasStories = this.state.stories.length !== 0;
    if (hasStories) {
      storiesList = this.state.stories.map((storyObj) => (
        <Card _id={storyObj._id} creator_name={storyObj.creator_name} content={storyObj.content} />
      ));
    } else {
      storiesList = <div>No stories!</div>;
    }
    return (
      <div>
        {/* TODO (step10): pass addNewStory as prop to NewStory */}
        <NewStory />
        {storiesList}
      </div>
    );
  }
}

export default Feed;
