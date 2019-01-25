import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import './Navbar.styles.scss';

class Navbar extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            uid: PropTypes.string
        }).isRequired,
        firebase: PropTypes.shape({
            auth: PropTypes.func.isRequired
        }),
        userInitials: PropTypes.string.isRequired
    };

    handleLogoutClick = (e) => {
        e.preventDefault();
        this.props.firebase.auth().signOut();
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect()
)(Navbar);