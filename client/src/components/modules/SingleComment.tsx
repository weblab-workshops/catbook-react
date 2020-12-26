import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Component to render a single comment
 */

export interface Comment {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}

class SingleComment extends Component<Comment> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-commentBody">
        <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold">
          {this.props.creator_name}
        </Link>
        <span>{" | " + this.props.content}</span>
      </div>
    );
  }
}

export default SingleComment;
