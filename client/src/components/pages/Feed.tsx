import React, { Component } from "react";
import Card from "../modules/Card";
import { NewStory } from "../modules/NewPostInput";

import { get } from "../../utilities";
import { Story } from "../modules/SingleStory";

interface Props {
  userId: string;
}

interface State {
  stories: Story[];
}

class Feed extends Component<Props, State> {
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
    get("/api/stories").then((storyObjs: Story[]) => {
      let reversedStoryObjs = storyObjs.reverse();
      reversedStoryObjs.map((storyObj) => {
        this.setState({ stories: this.state.stories.concat([storyObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewStory = (storyObj: Story) => {
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
          creator_id={storyObj.creator_id}
          content={storyObj.content}
          userId={this.props.userId}
        />
      ));
    } else {
      storiesList = <div>No stories!</div>;
    }
    return (
      <>
        {this.props.userId && <NewStory addNewStory={this.addNewStory} />}
        {storiesList}
      </>
    );
  }
}

export default Feed;
