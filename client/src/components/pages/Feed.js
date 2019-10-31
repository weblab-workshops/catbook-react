import React, { Component } from "react";
import Card from "../modules/Card.js";
import NewPost from "../modules/NewPost.js";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  componentDidMount() {
    document.title = "News Feed";
    this.getStories();
  }

  render() {
    return (
      <React.Fragment>
        <NewPost comment={false} />

        {this.state.stories ? (
          this.state.stories.map((storyObj) => (
            <Card key={`Card_${storyObj._id}`} story={storyObj} />
          ))
        ) : (
          <div>No stories!</div>
        )}
      </React.Fragment>
    );
  }

  getStories = () => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((storyObjs) => {
        let r_storyObjs = storyObjs.reverse();
        r_storyObjs.map((storyObj) => {
          this.setState({ stories: this.state.stories.concat([storyObj]) });
        });
      });
  };
}

export default Feed;
