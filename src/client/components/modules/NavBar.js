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
                            <Link to="/auth/google">Login</Link>
                        ) : (
                            <React.Fragment>
                                <Link to={`/u/profile?${this.props.userInfo._id}`}>Profile</Link>
                                <Link to="/logout">Logout</Link>
                            </React.Fragment>
                        )}
                </div>
            </nav>
        );
    }
}

export default NavBar;