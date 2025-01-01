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
  // TODO (step4): implement addStory, a callback function that takes in a story
  // and calls the addNewStory prop from Feed
  const addStory = (value) => {
    
  };

  // TODO (step4): render a NewPostInput that uses addStory as its onSubmit prop
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} storyId to add comment to
 * @param {({value}) => void} addNewComment: (function) triggered when a comment is submitted, takes {value} as parameters
 */
const NewComment = (props) => {
  // TODO (step8): implement addComment, a callback function that takes in a comment
  // and calls the addNewComment prop from Card
  const addComment = (value) => {
    
  };

  // TODO (step8): render a NewPostInput that uses addComment as its onSubmit prop
};

export { NewComment, NewStory };
