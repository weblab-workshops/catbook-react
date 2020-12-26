import React, { Component } from "react";
import SingleStory, { Story } from "./SingleStory";
import CommentsBlock from "./CommentsBlock";
import { Comment } from "./SingleComment";
import { get } from "../../utilities";

import "./Card.css";

interface Props extends Story {
  userId: string;
}

interface State {
  comments: Comment[];
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
    get("/api/comment", { parent: this.props._id }).then((comments: Comment[]) => {
      this.setState({
        comments: comments,
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewComment = (commentObj: Comment) => {
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
