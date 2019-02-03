import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class Profile extends Component {

    state = {
        email: '',
        error: '',
        firstName: '',
        lastName: '',
        oldPassword: '',
        password: ''
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

    handleEmailUpdate = (e) => {

    };

    handlePasswordUpdate = (e) => {

    };

    handleProfileUpdate = async (e) => {
        e.preventDefault();
        const { firebase, firestore, user } = this.props;
        const { email, firstName, lastName, password } = this.state;
        try {
            await firebase.auth().currentUser.updateEmail(email);
            firestore.collection('users').doc(user.uid).set({ firstName, lastName })
        } catch ({message}) {
            this.setState({
                error: message
            });
        }
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

                <form onSubmit={this.handleEmailUpdate}>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        onChange={this.handleInputChange}
                        type='text'
                        value={this.state.email}
                    />
                    <button type='submit'>Update Profile</button>
                </form>

                <form onSubmit={this.handleProfileUpdate}>
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
                    <button type='submit'>Update Profile</button>
                </form>

                <form>
                    <label htmlFor='oldPassword'>Old Password</label>
                    <input
                        id='oldPassword'
                        name='oldPassword'
                        onChange={this.handleInputChange}
                        type='password'
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        name='password'
                        onChange={this.handleInputChange}
                        type='password'
                    />
                    <label htmlFor='password'>Confirm Password</label>
                    <input
                        id='confirmPassword'
                        name='confirmPassword'
                        onChange={this.handleInputChange}
                        type='password'
                    />
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