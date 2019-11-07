import React, { Component } from "react";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPost.js";

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
    this.getStories();
  }

  render() {
    return (
      <>
        <NewStory />
        {this.state.stories ? (
          this.state.stories.map((storyObj) => (
            <Card key={`Card_${storyObj._id}`} story={storyObj} />
          ))
        ) : (
          <div>No stories!</div>
        )}
      </>
    );
  }

  getStories = () => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((storyObjs) => {
        let reversedStoryObjs = storyObjs.reverse();
        reversedStoryObjs.map((storyObj) => {
          this.setState({ stories: this.state.stories.concat([storyObj]) });
        });
      });
  };
}

export default Feed;
