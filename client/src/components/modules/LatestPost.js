import React, { Component } from "react";

/**
 * Component that renders the data of a user's latest post
 *
 * Proptypes
 * @param {string} id of post
 * @param {string} name of user
 * @param {string} latestPost is the content of the post
 */
class LatestPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-container">
        <div className="Card-story">
          <a className="Card-storyUser u-link" href={"/profile/" + this.props.id}>
            {this.props.name}
          </a>
          <p className="Card-storyContent">
            {this.props.latestPost ? this.props.latestPost : "No Posts Yet!"}
          </p>
        </div>
      </div>
    );
  }
}

export default LatestPost;
