import React, { Component } from "react";
import LatestPost from "../modules/LatestPost.js";
import ProfilePicture from "../../public/corgi.jpg";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      latestPost: null,
      id: null,
    };
  }

  componentDidMount() {
    this.getProfile(this.props.match.params.user);
    document.title = "Profile Page";
  }

  render() {
    const pfpStyle = {
      backgroundImage: `url(${ProfilePicture})`,
    };
    return (
      <React.Fragment>
        <div className="Profile-avatarContainer">
          <div style={pfpStyle} className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.name ? this.state.name : ""}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div className="text" id="profile-description">
              I am really allergic to cats i don't know why i have a catbook
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Latest Post</h4>
            {this.state.latestPost ? (
              <LatestPost
                name={this.state.name}
                latestPost={this.state.latestPost}
                id={this.state.id}
              />
            ) : (
              <div>No posts!</div>
            )}
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <h3 className="Profile-cat" id="favorite-cat">
              corgi
            </h3>
          </div>
        </div>
      </React.Fragment>
    );
  }

  getProfile = (id) => {
    fetch("/api/user?_id=" + id)
      .then((res) => res.json())
      .then((userObj) => {
        this.setState({
          name: userObj.name,
          latestPost: userObj.last_post,
          id: id,
        });
      });
  };
}

export default Profile;
