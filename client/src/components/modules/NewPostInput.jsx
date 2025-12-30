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
  /*
    TODO (Step 4.2): Implement addStory(value), a callback function where `value`
    is the user-inputted story content.
    
    Create a new story object with `value` as its content and call the addNewStory() 
    prop with this new story object as input. The ID and creator name can be anything.

    Recall how a story object is defined:
    storyObj: {
      _id: String,
      creator_name: String,
      content: String
    }
  */
  const addStory = (content) => {
    
  };

  // TODO (Step 4.2): render a NewPostInput that uses addStory as its onSubmit prop
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} storyId to add comment to
 * @param {({value}) => void} addNewComment: (function) triggered when a comment is submitted, takes {value} as parameters
 */
const NewComment = (props) => {
  const addComment = (content) => {
    
  };

};

export { NewComment, NewStory };
