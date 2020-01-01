import React, { Component } from "react";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";

import { get } from "../../utilities";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "News Feed";
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      reversedStoryObjs.map((storyObj) => {
        this.setState({ stories: this.state.stories.concat([storyObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewStory = (storyObj) => {
    this.setState({
      stories: [storyObj].concat(this.state.stories),
    });
  };

  render() {
    let storiesList = null;
    const hasStories = this.state.stories.length !== 0;
    if (hasStories) {
      storiesList = this.state.stories.map((storyObj) => (
        <Card
          key={`Card_${storyObj._id}`}
          _id={storyObj._id}
          creator_name={storyObj.creator_name}
          content={storyObj.content}
        />
      ));
    } else {
      storiesList = <div>No stories!</div>;
    }
    return (
      <>
        <NewStory addNewStory={this.addNewStory} />
        {storiesList}
      </>
    );
  }
}

export default Feed;
