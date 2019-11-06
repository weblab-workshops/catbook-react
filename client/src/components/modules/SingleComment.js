import React, { Component } from "react";
import { Link } from "@reach/router";

class SingleComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-commentBody">
        <Link to={"/profile/" + this.props.data.creator_id} className="u-link u-bold">
          {this.props.data.creator_name}
        </Link>
        <span>{" | " + this.props.data.content}</span>
      </div>
    );
  }
}

export default SingleComment;
