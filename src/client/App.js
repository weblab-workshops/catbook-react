import React, { Component } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import NavBar from "./modules/navbar.js"
import styles from "./styles.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginError: null,
            userInfo: null,
            data: []
        };
    }

    componentDidMount() {
    	axios.get('/api/whoami', {
		    params: {}
		})
        .then(res => res.json())
        .then(
            jsonObj => {
                this.setState({ userInfo: jsonObj });
                console.log(jsonObj);
            },
            error => {
            	this.setState({ loginError: error });
            	console.log(error);
        	}
        );
    }

	render(){
	    return (
	      	<NavBar 
	      		userInfo={!this.state.loginError ? this.state.userInfo : null}
	      	/>
	    );
	}
}

export default App;
