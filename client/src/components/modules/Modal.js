import React from "react";

import "./Modal.css";

/**
 * Props
 * @param {bool} show
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
          <div className="Modal-container u-positionRelative">You have disconnected</div>
        </div>
      )
    );
  }
}

export default Modal;
