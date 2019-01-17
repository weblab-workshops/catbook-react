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
                    <Link to="/" className="nav-item nav-link">Home</Link>
                        { this.props.userInfo === null ? (
                            <a className="nav-item nav-link" onClick={this.props.login}>Login</a>
                        ) : (
                            <React.Fragment>
                                <Link to={"/profile/" + this.props.userInfo._id} className="nav-item nav-link">Profile</Link>
                                <a className="nav-item nav-link" onClick={this.props.logout}>Logout</a>
                            </React.Fragment>
                        )}
                </div>
            </nav>
        );
    }
}

export default NavBar;