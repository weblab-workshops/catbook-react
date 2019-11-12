import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * @typedef CommentData
 * @property {string} creator_id
 * @property {string} creator_name
 * @property {string} content of the comment
 */

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {CommentData} data
 */
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
