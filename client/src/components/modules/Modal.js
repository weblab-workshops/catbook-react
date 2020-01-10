import React from "react";

import "./Modal.css";

/**
 * Displays a modal (popup message) to the page
 *
 * Proptypes
 * @param {bool} show true if this modal should be displayed
 * @param {string} message the text to be displayed
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      this.props.show && (
        <div className="Modal-background u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className="Modal-container u-positionRelative">{this.props.message}</div>
        </div>
      )
    );
  }
}

export default Modal;
