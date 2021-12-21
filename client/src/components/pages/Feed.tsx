import React, { useState, useEffect } from "react";
import Card from "../modules/Card";
import { NewStory } from "../modules/NewPostInput";
import { Story } from "../modules/SingleStory";

import { get } from "../../utilities";

type FeedProps = {
  userId: string;
}

const Feed = (props: FeedProps) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [storiesList, setStoriesList] = useState(null);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "News Feed";
    get("/api/stories").then((storyObjs: Story[]) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories([...reversedStoryObjs]);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewStory = (storyObj: Story) => {
    setStories([storyObj, ...stories]);
  };

  useEffect(() => {
    const hasStories = stories.length !== 0;
    if (hasStories) {
      setStoriesList(
        stories.map((storyObj) => (
          <Card
            key={`Card_${storyObj._id}`}
            _id={storyObj._id}
            creator_name={storyObj.creator_name}
            creator_id={storyObj.creator_id}
            content={storyObj.content}
            userId={props.userId}
          />
        ))
      );
    } else {
      setStoriesList(<div>No stories!</div>);
    }
  }, [stories, props.userId]);
  return (
    <>
      {props.userId && <NewStory addNewStory={addNewStory} />}
      {storiesList}
    </>
  );
};

export default Feed;
