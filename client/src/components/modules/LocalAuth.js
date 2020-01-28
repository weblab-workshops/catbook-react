import React, { Component } from "react";
import { post } from "../../utilities.js";

class LocalAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      isRegistering: false,
      errorMessage: "",
    };
  }

  componentDidMount() {}

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  attemptLogin = () => {
    const { email, password } = this.state;
    console.log(email, password);
    post("/auth/login", { email, password })
      .then((user) => {
        this.props.login(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  attemptRegister = () => {
    const { email, password, passwordConfirm } = this.state;
    if (password != passwordConfirm) {
      this.setState({ errorMessage: "Passwords don't match" });
    } else {
      post("/auth/register", { email, password })
        .then((user) => {
          this.props.login(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  toggleRegistrationStatus = () => {
    this.setState({ isRegistering: !this.state.isRegistering });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} type="email" name="email" placeholder="Email"></input>
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          placeholder="Password"
        ></input>
        {this.state.isRegistering ? (
          <>
            <input
              onChange={this.handleChange}
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
            ></input>

            <div className="u-link" onClick={this.attemptRegister}>
              Register
            </div>
            <div className="u-link" onClick={this.toggleRegistrationStatus}>
              Have an account?
            </div>
          </>
        ) : (
          <>
            <div className="u-link" onClick={this.attemptLogin}>
              Login
            </div>
            <div className="u-link" onClick={this.toggleRegistrationStatus}>
              Register?
            </div>
          </>
        )}
        <div>{this.state.errorMessage}</div>
      </div>
    );
  }
}

export default LocalAuth;
