import React, { Component } from 'react';
import LatestPost from '../modules/LatestPost.js';
import ProfilePicture from '../../public/corgi.jpg';
import "../../styles.css"

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
          backgroundImage: `url(${ProfilePicture})`
        };
        return (
            <div className="container text-center">
                <div className="large-profile-container text-center my-4">
                  <div style={pfpStyle} className={'circle-avatar'}>
                  </div>
                </div>
                <h1>{this.state.name ? this.state.name : ""}</h1>
                <hr/>
                <div className="row mt-4">
                    <div className="col-4">
                        <h4>About Me</h4>
                        <br/>
                        <div className="text" id="profile-description">
                            I am really allergic to cats i don't know why i have a catbook
                        </div>
                    </div>
                    <div className="col-4">
                        <h4>My Latest Post</h4>
                        <br/>
                        { this.state.latestPost ? (
                            <LatestPost
                                name={this.state.name}
                                latestPost={this.state.latestPost}
                                id={this.state.id}
                            />
                        ) : (
                            <div>
                                No posts!
                            </div>
                        )}
                    </div>
                    <div className="col-4">
                        <h4>My Favorite Type of Cat</h4>
                        <br/>
                        <h3 id="favorite-cat">corgi</h3>
                    </div>
                </div>
            </div>
        );
    }

    getProfile = (id) => {
    fetch("/api/user?_id=" + id)
        .then(res => res.json())
        .then(
            userObj => {
                this.setState({ 
                    name: userObj.name,
                    latestPost: userObj.last_post,
                    id: id
                });
            }
        );
} 
}

export default Profile;