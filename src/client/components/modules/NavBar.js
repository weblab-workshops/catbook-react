import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// const routes = [
//     {
//         title: 'Home',
//         path: '/',
//         exact: true,
//         component: Feed
//     },
//     {
//         title: 'Profile',
//         path: `/u/profile?:user`,
//         exact: true,
//         component: Profile
//     }
// ];

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    login = () => {
        const redirectURL = window.location.origin + '/auth/google';
        window.location.replace(redirectURL);
    }

    logout = () => {
        const redirectURL = window.location.origin + '/logout';
        window.location.replace(redirectURL);
    }

    render() {
        console.log(this.props.userInfo);
        // const menuList = routes.map((route, i) => {
        //     const page = route.path.slice(1);
        //     return (
        //         <NavLink
        //             key={`${page}NavLink_${i}`}
        //             to={route.path}
        //             exact
        //             activeClassName={styles.activeLink}
        //             onClick={() => this.setMenu(page)}
        //         >
        //             <div className={styles.title}>{route.title}</div>
        //         </NavLink>
        //     );
        // });

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="navbar-brand">Catbook</div>
                <div className="navbar-nav">
                    <Link to="/">Home</Link>
                        { this.props.userInfo === null ? (
                            <button onClick={this.login}>Login</button>
                            // <Link to="/login">Login</Link>
                        ) : (
                            <React.Fragment>
                                <Link to={`/u/profile?${this.props.userInfo._id}`}>Profile</Link>
                                <button onClick={this.logout}>Logout</button>
                            </React.Fragment>
                        )}
                </div>
            </nav>
        );
    }
}

export default NavBar;