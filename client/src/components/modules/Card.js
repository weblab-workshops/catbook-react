import React, { Component } from "react";
import { get } from "../../utilities";
import SingleStory from "./SingleStory.js";
import SingleComment from "./SingleComment.js";
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
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    get("/api/comment", { parent: this.props._id }).then((comments) => {
      this.setState({ comments: comments });
    });
  }

  render() {
    let commentsList = null;
    const hasComments = this.state.comments.length !== 0;
    if (hasComments) {
      commentsList = this.state.comments.map((commentObj) => (
        <SingleComment
          _id={commentObj._id}
          creator_name={commentObj.creator_name}
          content={commentObj.content}
        />
      ));
    } else {
      commentsList = <div>No comments!</div>;
    }

    return (
      <div className="Card-container">
        <SingleStory
          _id={this.props._id}
          creator_name={this.props.creator_name}
          content={this.props.content}
        />
        {commentsList}
      </div>
    );
    // TODO (step8): add in the NewComment component (refer to Feed)
    // TODO (step9): use CommentsBlock
  }
}

export default Card;
