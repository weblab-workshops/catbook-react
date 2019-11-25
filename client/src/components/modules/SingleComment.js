import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the comment
 */
class SingleComment extends Component {
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
