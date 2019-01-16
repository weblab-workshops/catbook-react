import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="navbar-brand">Catbook</div>
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href={"/"}>Home</a>
                        { this.props.userInfo === null ? (
                            <a className="nav-item nav-link" href={"#"} onClick={this.props.login}>Login</a>
                        ) : (
                            <React.Fragment>
                                <a className="nav-item nav-link" href={"/profile/" + this.props.userInfo._id}>Profile</a>
                                <a className="nav-item nav-link" href={"#"} onClick={this.props.logout}>Logout</a>
                            </React.Fragment>
                        )}
                </div>
            </nav>
        );
    }
}

export default NavBar;