import React, { Component } from 'react';
import LatestPost from '../modules/LatestPost.js';

class Profile extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
        };
    }

    componentDidMount() {
        document.title = "Profile Page";
    }

    render() {
        console.log("hi i am profile?");
        return (
            <div className="container text-center">
                <div className="large-profile-container text-center my-4">
                    <div className="circle-avatar" id="profile-image"></div>
                </div>
                <h1>{this.props.userInfo.name}</h1>
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
                        <LatestPost
                            userInfo={this.props.userInfo}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <h4>My Favorite Type of Cat</h4>
                    <br/>
                    <h3 id="favorite-cat">Russian Blue</h3>
                </div>
            </div>
        );
    }
}

export default Profile;