import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    login = () => {
        const redirectURL = window.location.origin + '/auth/google';
        window.location.replace(redirectURL);
    }

    render() {
        return (
            <div>
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}

export default Login;