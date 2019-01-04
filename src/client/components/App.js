import React, { Component } from "react";
import { hot } from "react-hot-loader";
import NavBar from "./modules/Navbar.js";
import Feed from "./pages/Feed.js";
import Profile from "./pages/Profile.js"
import { Route, Switch } from 'react-router-dom';
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
                        userInfo: jsonObj
                    });
                } else {
                    this.setState({ 
                        userInfo: null
                    });
                }
            }
        );
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
                </Switch>
            </React.Fragment>
	    );
	}
}

export default App;
