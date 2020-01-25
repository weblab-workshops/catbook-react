import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socket } from "../../client-socket.js";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  openPopup = () => {
    const { provider } = this.props;
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const API_URL = "/auth";
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };

  startAuth = (e) => {
    // if (!this.state.disabled) {
    //   e.preventDefault();
    //   this.popup = this.openPopup();
    //   this.checkPopup();
    //   this.setState({ disabled: "disabled" });
    // }
    this.popup = this.openPopup();
  };

  componentDidMount() {
    const { provider } = this.props;

    socket.on(provider, (user) => {
      this.popup.close();
      this.setState({ user });
    });
  }

  render() {
    const { name, photo } = this.state.user;
    const { provider } = this.props;
    return (
      <>
        {name ? (
          <FontAwesomeIcon icon="smile-wink" />
        ) : (
          <button onClick={this.startAuth}>
            <FontAwesomeIcon icon={["fab", "google"]} />
          </button>
        )}
      </>
    );
  }
}

export default Auth;
