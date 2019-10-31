import React, { Component } from "react";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container feed-container">
        <div className="row">
          <div className="col">
            <h1>404 Not Found</h1>
            <p>The page you requested couldn't be found.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
