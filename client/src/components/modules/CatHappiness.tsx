import React, { Component } from "react";
import "./CatHappiness.css";

/**
 * Component that renders cat happiness
 */

interface Props {
  catHappiness: number;
}

class CatHappiness extends Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="CatHappiness-container">
        <div className="CatHappiness-story">
          <p className="CatHappiness-storyContent">{this.props.catHappiness}</p>
        </div>
      </div>
    );
  }
}

export default CatHappiness;
