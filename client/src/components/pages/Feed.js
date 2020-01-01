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
      <div>
        <NewStory addNewStory={this.addNewStory} />
        {storiesList}
      </div>
    );
  }
}

export default Feed;
