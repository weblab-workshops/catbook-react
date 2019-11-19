import React, { Component } from "react";
import LatestPost from "../modules/LatestPost.js";
import ProfilePicture from "../../public/corgi.jpg";
import { get } from "../../utilities";
import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  render() {
    const pfpStyle = {
      backgroundImage: `url(${ProfilePicture})`,
    };
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <div className="Profile-avatarContainer">
          <div style={pfpStyle} className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div className="text" id="profile-description">
              Extra Challenge: Modify catbook to show a personalized description here!
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Latest Post</h4>
            <LatestPost
              name={this.state.user.name}
              latestPost={this.state.user.last_post}
              id={this.state.user._id}
            />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <h3 className="Profile-cat" id="favorite-cat">
              corgi
            </h3>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
