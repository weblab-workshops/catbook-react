import React, { Component } from "react";

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
          <p className="Card-storyContent">{this.props.latestPost}</p>
        </div>
      </div>
    );
  }
}

export default LatestPost;
