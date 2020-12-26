import React, { Component } from "react";
import CatHappiness from "../modules/CatHappiness";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";
import { User } from "./Chatbook";

interface Props {
  userId: string;
}

interface State {
  user: User | undefined;
  catHappiness: number;
}

class Profile extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      catHappiness: 0,
    };
  }

  getUserData = () => {
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
  };

  componentDidMount() {
    document.title = "Profile Page";
    this.getUserData();
  }

  componentDidUpdate(oldProps: Props) {
    // this is called whenever the props change (call API again if the userId changes)
    if (oldProps.userId !== this.props.userId) {
      this.getUserData();
    }
  }

  incrementCatHappiness = () => {
    this.setState({
      catHappiness: this.state.catHappiness + 1,
    });
  };

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <div
          className="Profile-avatarContainer"
          onClick={() => {
            this.incrementCatHappiness();
          }}
        >
          <div className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              Extra Challenge: Modify catbook to show a personalized description here!
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">Cat Happiness</h4>
            <CatHappiness catHappiness={this.state.catHappiness} />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <div id="favorite-cat">corgi</div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
