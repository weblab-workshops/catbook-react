import React, { Component } from "react";
import Story from "./Story.js";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

import "./Card.css";

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
        <Story data={this.props.story} />
        <CommentsBlock story={this.props.story} comments={this.state.comments} />
      </div>
    );
  }
}

export default Card;
