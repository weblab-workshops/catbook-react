import React, { Component } from "react";
import { get } from "../../utilities";
import SingleStory from "./SingleStory.js";
import CommentsBlock from "./CommentsBlock.js";

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

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewComment = (commentObj) => {
    this.setState({
      comments: this.state.comments.concat([commentObj]),
    });
  };

  render() {
    return (
      <div className="Card-container">
        <SingleStory
          _id={this.props._id}
          creator_name={this.props.creator_name}
          content={this.props.content}
        />
        <CommentsBlock
          storyId={this.props._id}
          comments={this.state.comments}
          addNewComment={this.addNewComment}
        />
      </div>
    );
  }
}

export default Card;
