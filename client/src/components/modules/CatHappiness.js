import React, { Component } from "react";
import "./CatHappiness.css";

/**
 * Component that renders cat happiness
 *
 * Proptypes
 * @param {int} catHappiness is how happy your cat is
 */
class CatHappiness extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: fill this in with code!
    return <div>{this.props.catHappiness}</div>;
  }
}

export default CatHappiness;
