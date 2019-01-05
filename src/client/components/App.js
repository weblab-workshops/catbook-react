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
            data: []
        };
    }

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
        );
    }

    login = () => {
        const redirectURL = window.location.origin + '/auth/google';
        window.location.replace(redirectURL);
    }

	render(){
	    return (
            <React.Fragment>
    	      	<NavBar 
    	      		userInfo={this.state.userInfo}
    	      	/>
                <Switch>
                    <Route exact path='/' component={Feed}/>
                    <Route path='/u/profile?:user' component={Profile}/>
                    // <Redirect from='/login' to='/auth/google'>{this.login}</Redirect>
                </Switch>
            </React.Fragment>
	    );
	}
}

export default withRouter(App);
