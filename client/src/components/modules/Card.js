import React, { Component } from "react";
import Story from "./Story.js";
import CommentsBlock from "./CommentsBlock.js";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {import("../pages/Feed").StoryObject} story information including id and content to be rendered
 */
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    this.getComments(this.props.story._id).then((comments) => {
      this.setState({
        comments: comments,
      });
    });
  }

  render() {
    return (
      <div className="Card-container">
        <Story data={this.props.story} />
        <CommentsBlock {...this.props} comments={this.state.comments} />
      </div>
    );
  }

  getComments = (storyId) => {
    return fetch(`/api/comment?parent=${storyId}`).then((res) => res.json());
  };
}

export default Card;
