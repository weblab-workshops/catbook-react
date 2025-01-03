import React, { useState, useEffect } from "react";
import Card from "../modules/Card";
import { NewStory } from "../modules/NewPostInput";
// TODO (step0): import get and post

const Feed = () => {
  const [stories, setStories] = useState([]);

  // updates the stories state so that the new story is added immediately
  const addNewStory = (value) => {
    // TODO (step2): post the new story to the server
    setStories([value].concat(stories));
  }

  useEffect(() => {
    // TODO (step1): fetch the stories from the server
    const story1 = {
      _id: "id1",
      creator_name: "Stanley Zhao",
      content: "Hi everyone",
    };
    const story2 = {
      _id: "id2",
      creator_name: "Abby Chou",
      content: "Web.lab rocks",
    };
    const story3 = {
      _id: "id3",
      creator_name: "Andy Jiang",
      content: "I like cats",
    };
    const hardcodedStories = [story1, story2, story3];
    
    setStories(hardcodedStories);
  }, []);

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
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
      <NewStory addNewStory={addNewStory} />
      {storiesList}
    </div>
  );
};

export default Feed;
