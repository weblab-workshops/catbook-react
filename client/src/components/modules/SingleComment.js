import React, { Component } from "react";
import { Link } from "@reach/router";

class SingleComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-commentBody">
        <Link to={`/profile/${this.props.comment.creator_id}`} className="u-link u-bold">
          {this.props.comment.creator_name}
        </Link>
        <span>{" | " + this.props.comment.content}</span>
      </div>
    );
  }
}

export default SingleComment;
