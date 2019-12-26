import React, { Component } from "react";
import { get } from "../../utilities";
// TODO (step6): import SingleStory
// TODO (step7): import SingleComment
// TODO (step8): import NewComment
// TODO (step9): import CommentsBlock

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
class Card extends Component {
  constructor(props) {
    super(props);
    // TODO (step6): define state to hold comments (refer to Feed)
  }

  componentDidMount() {
    // TODO (step6): implement a GET call to retrieve comments,
    // and assign it to state
  }

  render() {
    // TODO (step6): render a SingleStory using props,
    // and render the comments from state (with JSON.stringify)
    // from state using a map (refer to Feed)
    // TODO (step7): map comments from state into SingleComment
    // components (refer to Feed)
    // TODO (step8): add in the NewComment component (refer to Feed)
    // TODO (step9): use CommentsBlock
  }
}

export default Card;
