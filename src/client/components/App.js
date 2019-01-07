import React, { Component } from "react";
import { hot } from "react-hot-loader";
import NavBar from "./modules/Navbar.js";
import Feed from "./pages/Feed.js";
import Profile from "./pages/Profile.js";
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

    componentDidMount() {
        this.getUser();
        this.getStories();
    }

	render(){
        console.log("rendering from react")
	    return (
	      <React.Fragment>
            <NavBar
                userInfo={this.state.userInfo}
                login={this.login}
                logout={this.logout}
            />
            <Switch>
                <Route exact path='/' render={(props) => <Feed {...props} userInfo={this.state.userInfo} stories={this.state.stories} addStory={this.addStory} addComment={this.addComment} />}/>
                <Route exact path='/profile/:user' render={(props) => <Profile {...props} />}/>
            </Switch>
        </React.Fragment>
	    );
	}

    login = () => {
        const redirectURL = window.location.origin + '/auth/google';
        window.location.replace(redirectURL);
    }

    logout = () => {
        fetch('/logout')
        .then(
            this.setState({
                userInfo: null
            })
        );
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

    getUser = () => {    
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
        );
    }

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
