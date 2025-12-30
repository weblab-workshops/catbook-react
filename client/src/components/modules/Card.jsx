import React, { useEffect } from "react";
// TODO (Step 6.2): import useState from react
// TODO (Step 6.2): import SingleStory

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const Card = (props) => {
  // TODO (Step 6.2): define a state called "comments" to hold comments (refer to Feed)


  useEffect(() => {
    // TODO (Step 6.3): assign HARDCODED dummy values to the comments state
    // a comment should be an object of the form: 
    // {
    //   _id: "some random string of letters",
    //   creator_name: "creator name",
    //   parent: "parent story id",
    //   content: "story content",
    // }
  }, []);

  // TODO (Step 6.3): render a SingleStory using props

  // TODO (Step 6.3): render the comments from state (with JSON.stringify)
};

export default Card;
