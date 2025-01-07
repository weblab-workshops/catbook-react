import React, { useState } from "react";

import "./NewPostInput.css";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Story is a New Post component for stories
 * 
 * Proptypes
 * @param {({value}) => void} addNewStory: (function) triggered when a story is submitted, takes {value} as parameters
 */
const NewStory = (props) => {
  const addStory = (value) => {
    // Give each story a unique id
    let id = "id" + Math.random().toString(16).slice(2);
    props.addNewStory({content: value, creator_name: "Anonymous User", _id: id});
  };

  return <NewPostInput defaultText="What's on your mind?" onSubmit={addStory} />
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} storyId to add comment to
 * @param {({value}) => void} addNewComment: (function) triggered when a comment is submitted, takes {value} as parameters
 */
const NewComment = (props) => {
  const addComment = (value) => {
    // Give each comment a unique id
    let id = "id" + Math.random().toString(16).slice(2);
    props.addNewComment({content: value, creator_name: "Anonymous User", _id: id, parent: props.storyId});
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

export { NewComment, NewStory };
