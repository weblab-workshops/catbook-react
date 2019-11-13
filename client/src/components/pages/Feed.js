import React, { Component } from "react";
import Card from "../modules/Card.js";
<<<<<<< HEAD
import { NewStory } from "../modules/NewPost.js";
import { get } from "../../utilities";
=======
import { NewStory } from "../modules/NewPostInput.js";
>>>>>>> NewPost renamed as NewPostInput, and added a little more to utilities.css comment

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

  render() {
    let storiesList = null;
    const hasStories = this.state.stories.length !== 0;
    if (hasStories) {
      storiesList = this.state.stories.map((storyObj) => (
        <Card key={`Card_${storyObj._id}`} story={storyObj} />
      ));
    } else {
      storiesList = <div>No stories!</div>;
    }
    return (
      <>
        <NewStory />
        {storiesList}
      </>
    );
  }
}

export default Feed;
