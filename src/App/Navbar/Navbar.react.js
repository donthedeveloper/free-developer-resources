import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../Auth/Auth.actions';
import './Navbar.styles.scss';

class Navbar extends Component {
    handleLogoutClick = (e) => {
        e.preventDefault();
        this.props.signOut();
    };

    render() {
        const auth = this.props.auth;
        const userIsLoggedIn = !!auth.uid;

        return (
            <nav className='navbar'>
                <Link className='navbar__link' to='/'>Free Developer Resources</Link>
                <ul className='navbar-list'>
                    <li><NavLink className='navbar__link' to='/resources'>Resources</NavLink></li>
                    {!userIsLoggedIn &&
                        <li><NavLink className='navbar__link' to='/signup'>SignUp</NavLink></li>
                    }
                    {!userIsLoggedIn &&
                        <li><NavLink className='navbar__link' to='/signin'>Login</NavLink></li>
                    }
                    {userIsLoggedIn &&
                        <li>
                            <a
                                className='navbar__link'
                                href='#'
                                onClick={this.handleLogoutClick}
                            >
                                Logout
                            </a>
                        </li>
                    }
                    {/* <li><NavLink className='navbar__link' to='/admin'>Admin</NavLink></li> */}
                    {/* <li><NavLink className='navbar__link' to='/profile'>Profile</NavLink></li> */}
                </ul>
            </nav>
        );
    }
};

const mapStateToProps = state => ({
    auth: state.firebase.auth
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);