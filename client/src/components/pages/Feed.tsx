import React, { useState, useEffect, JSX } from "react";
import Card from "../modules/Card";
import { NewStory } from "../modules/NewPostInput";
import { useOutletContext } from "react-router-dom";

import { get } from "../../utilities";

interface StoryObject {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

interface FeedProps {
  userId: string;
}

const Feed: React.FC = () => {
  let props = useOutletContext<FeedProps>();
  const [stories, setStories] = useState<StoryObject[]>([]);

  // Called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "News Feed";
    get("/api/stories").then((storyObjs: StoryObject[]) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, []);

  // This gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewStory = (storyObj: StoryObject) => {
    setStories([storyObj].concat(stories));
  };

  let storiesList: JSX.Element[] = [];
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        creator_id={storyObj.creator_id}
        userId={props.userId}
        content={storyObj.content}
      />
    ));
  } else {
    storiesList = [<div>No stories!</div>];
  }

  return (
    <>
      {props.userId && <NewStory addNewStory={addNewStory} />}
      {storiesList}
    </>
  );
};

export default Feed;
