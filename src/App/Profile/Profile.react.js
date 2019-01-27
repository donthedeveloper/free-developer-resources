import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class Profile extends Component {

    state = {
        email: '',
        firstName: '',
        lastName: ''
    }

    getSnapshotBeforeUpdate(prevProps) {
        const user = this.props.user;
        const userIsLoaded = user.isLoaded;

        const state = {};
        if (!prevProps.user.isLoaded && userIsLoaded) {
            state.email = user.email;
        } 

        const profile = this.props.userProfile;
        if (!prevProps.userProfile.isLoaded && profile.isLoaded) {
            state.firstName = profile.firstName;
            state.lastName = profile.lastName;
        }

        return Object.keys(state).length ? state : null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            this.setState(snapshot);
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        if (!this.props.user.isLoaded) {
            return <i className="fas fa-spinner"></i>;
        }

        if (!this.props.isLoggedIn) {
            return <Redirect to='/signin' />
        }

        return (
            <div>
                <h1>Edit Profile</h1>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        id='firstName'
                        name='firstName'
                        onChange={this.handleInputChange}
                        type='text'
                        value={this.state.firstName}
                    />
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        id='lastName'
                        name='lastName'
                        onChange={this.handleInputChange}
                        type='text'
                        value={this.state.lastName}
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        onChange={this.handleInputChange}
                        type='text'
                        value={this.state.email}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        name='password'
                        onChange={this.handleInputChange}
                        type='password'
                    />
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: !!state.firebase.auth.uid,
    user: state.firebase.auth,
    userProfile: state.firebase.profile
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect()
)(Profile);