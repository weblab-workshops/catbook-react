import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// const routes = [
//     {
//         title: 'Catbook',
//         path: '/',
//         exact: true,
//         component: Feed
//     },
//     {
//         title: 'Profile',
//         path: `/u/profile?/${userInfo}`,
//         exact: true,
//         component: Profile
//     },
// ];

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                <div className="navbar-brand" href="#">Catbook</div>
            </nav>
        );
    }
}

export default NavBar;