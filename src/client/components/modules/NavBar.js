import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="navbar-brand">Catbook</div>
                <div className="navbar-nav">
                    <Link to="/">Home</Link>
                        { this.props.userInfo === null ? (
                            <button onClick={this.props.login}>Login</button>
                            // <Link to="/login">Login</Link>
                        ) : (
                            <React.Fragment>
                                <Link to={"/profile/" + this.props.userInfo._id}>Profile</Link>
                                <button onClick={this.props.logout}>Logout</button>
                            </React.Fragment>
                        )}
                </div>
            </nav>
        );
    }
}

export default NavBar;