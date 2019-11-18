import React, { Component } from "react";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";

import { get } from "../../utilities";

/**
 * The following are type definitions for documentation of various
 * props used by child components of Feed
 */

/**
 * Used in Story, chlid of StoryObject
 * @typedef {Object} StoryData
 * @property {string} creator_id
 * @property {string} creator_name
 * @property {string} content of the story
 */

/**
 * Used in Card and CommentsBlock
 * @typedef StoryObject
 * @property {string} _id of story
 * @property {StoryData} data of creator and content
 */

/**
 * Used in SingleComment, child of CommentsObject
 * @typedef CommentData
 * @property {string} creator_id
 * @property {string} creator_name
 * @property {string} content of the comment
 */

/**
 * Used in CommentsBlock
 * @typedef CommentsObject
 * @property {string} _id of the comment
 * @property {CommentData} data
 */

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
