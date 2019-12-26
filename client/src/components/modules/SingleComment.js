import React, { Component } from "react";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Card-commentBody">
        <div className="Card-commentBody">
          <span className="u-bold">{this.props.creator_name}</span>
          <span>{" | " + this.props.content}</span>
        </div>
      </div>
    );
  }
}

export default SingleComment;
