import React, { Component } from "react";
import { Link } from "@reach/router";

class SingleComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-commentBody">
        <span className="u-bold">{this.props.data.creator_name}</span>
        <span>{" | " + this.props.data.content}</span>
      </div>
    );
  }
}

export default SingleComment;
