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
        {/* TODO (step7): use JSX and props to render comment creator and content */}
      </div>
    );
  }
}

export default SingleComment;
