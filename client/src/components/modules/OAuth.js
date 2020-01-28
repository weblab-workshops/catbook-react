import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities.js";

class OAuth extends Component {
  constructor(props) {
    super(props);
  }

  openPopup = () => {
    const { provider } = this.props;
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `/auth/${provider}?socketId=${socket.id}`;

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
    console.log(this.popup);
  };

  componentDidMount() {
    const { provider } = this.props;
    socket.on(provider, (user) => {
      this.props.login(user);
      this.popup.close();
    });
  }

  render() {
    const { provider } = this.props;
    return (
      <div className="NavBar-link u-pointer" onClick={this.startAuth}>
        <FontAwesomeIcon icon={["fab", provider]} />
      </div>
    );
  }
}

export default OAuth;
