import React, { Component } from "react";
import { Link } from "react-router-dom";

class Story extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-story">
        <Link to={"/profile/" + this.props.data.creator_id} className="Card-storyUser u-link">
          {this.props.data.creator_name}
        </Link>
        <p className="Card-storyContent">{this.props.data.content}</p>
      </div>
    );
  }
}

export default Story;
