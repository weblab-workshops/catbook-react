import React, { Component } from "react";
import SingleStory from "./SingleStory.js";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

import "./Card.css";

interface Props {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
  userId: string;
}

interface State {
  comments: any;
}

/**
 * Card is a component for displaying content like stories
 */
class Card extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    get("/api/comment", { parent: this.props._id }).then((comments) => {
      this.setState({
        comments: comments,
      });
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
          creator_id={this.props.creator_id}
          content={this.props.content}
        />
        <CommentsBlock
          story={this.props}
          comments={this.state.comments}
          addNewComment={this.addNewComment}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

export default Card;
