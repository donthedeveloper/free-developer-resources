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
                <ul className='navbar__list'>
                    <li><NavLink className='navbar__link' to='/resources'>Resources</NavLink></li>
                    {!userIsLoggedIn &&
                        <li><NavLink className='navbar__link' to='/signup'>SignUp</NavLink></li>
                    }
                    {!userIsLoggedIn &&
                        <li><NavLink className='navbar__link' to='/signin'>Login</NavLink></li>
                    }
                    {/* {userIsLoggedIn &&
                        <li><NavLink className='navbar__link' to='/profile'>Profile</NavLink></li>
                    } */}
                    {userIsLoggedIn &&
                        <li>
                            <button
                                className='navbar__link'
                                onClick={this.handleLogoutClick}
                            >
                                Logout
                            </button>
                        </li>
                    }
                    <li><NavLink className='navbar__link' to='/admin'>Admin</NavLink></li>
                    <li>{this.props.userInitials}</li>
                </ul>
            </nav>
        );
    }
};

const mapStateToProps = state => {
    const { firstName, lastName } = state.firebase.profile;
    const firstInitial = firstName ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName ? lastName[0].toUpperCase() : '';
    return {
        auth: state.firebase.auth,
        userInitials: firstInitial + lastInitial
    }
}

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);