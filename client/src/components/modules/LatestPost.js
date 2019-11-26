import React, { Component } from "react";
import "./LatestPost.css";

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
      <div className="LatestPost-container">
        <div className="LatestPost-story">
          <a className="LatestPost-storyUser u-link" href={"profile/" + this.props.id}>
            {this.props.name}
          </a>
          <p className="LatestPost-storyContent">{this.props.latestPost}</p>
        </div>
      </div>
    );
  }
}

export default LatestPost;
