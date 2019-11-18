import React, { Component } from "react";
import SingleStory from "./SingleStory.js";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

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
    get("/api/comment", { parent: this.props.story._id }).then((comments) => {
      this.setState({
        comments: comments,
      });
    });
  }

  render() {
    return (
      <div className="Card-container">
        <SingleStory data={this.props.story} />
        <CommentsBlock story={this.props.story} comments={this.state.comments} />
      </div>
    );
  }
}

export default Card;
