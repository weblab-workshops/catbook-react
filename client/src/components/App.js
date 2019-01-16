import React, { Component } from "react";
import NavBar from "./modules/Navbar.js";
import Feed from "./pages/Feed.js";
import Profile from "./pages/Profile.js";
import { Route, Switch, withRouter } from 'react-router-dom';
import styles from "../styles.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null
        };
    }

    componentDidMount() {
        this.getUser();
    }

	render(){
	    return (
	      <React.Fragment>
            <NavBar
                userInfo={this.state.userInfo}
                login={this.login}
                logout={this.logout}
            />
            <Switch>
                <Route exact path='/' render={(props) => <Feed {...props} userInfo={this.state.userInfo} />}/>
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

}

export default withRouter(App);
