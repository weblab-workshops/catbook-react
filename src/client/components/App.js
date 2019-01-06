import React, { Component } from "react";
import { hot } from "react-hot-loader";
import NavBar from "./modules/Navbar.js";
import Feed from "./pages/Feed.js";
import Profile from "./pages/Profile.js"
import Login from "./modules/Login.js";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styles from "../styles.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null,
            stories: []
        };
    }
    //is there a cleaner way to write this guy
    componentDidMount() {
        fetch('/api/whoami')
        .then(res => res.json())
        .then(
            userObj => {
                if (userObj._id !== undefined) {
                    this.setState({ 
                        userInfo: userObj
                    });
                } else {
                    this.setState({ 
                        userInfo: null
                    });
                }
            }
        )
        .then(this.getStories);
    }

    // idk if this is needed for when u add a new story and want it to show up right away?
    // componentDidUpdate() {}

	render(){
	    return (
            <React.Fragment>
    	      	<NavBar 
    	      		userInfo={this.state.userInfo}
    	      	/>
                <Switch>
                    <Route exact path='/' render={(props) => <Feed {...props} userInfo={this.state.userInfo} stories={this.state.stories} addStory={this.addStory} addComment={this.addComment} />}/>
                    <Route path='/u/profile?:user' render={(props) => <Profile {...props} userInfo={this.state.userInfo} />}/>
                    <Redirect from='/login' to='/auth/google'>{this.login}</Redirect>
                </Switch>
            </React.Fragment>
	    );
	}

    // login not used here as of now
    login = () => {
        const redirectURL = window.location.origin + '/auth/google';
        window.location.replace(redirectURL);
    }

    getStories = () => {
        fetch('/api/stories')
        .then(res => res.json())
        .then(
            storyObj => {
                this.setState({ 
                    stories: storyObj
                });
            }
        );
    }

    // may need to update state here?? would need to change response from api.js since it returns {} atm
    addStory = (content) => {
        const body = { 'content': content };
        fetch('/api/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    addComment = (parent, content) => {
        const body = {'parent': parent, 'content': content };
        fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }


}

export default withRouter(App);
