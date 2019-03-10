import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import VerifyPasswordModal from './VerifyPasswordModal/VerifyPasswordModal.react';

class Profile extends Component {

    state = {
        confirmPassword: '',
        email: '',
        error: '',
        firstName: '',
        lastName: '',
        newPassword: '',
        showVerifyPasswordModal: false
    }

    componentDidUpdate(prevProps) {
        const {userProfile, user} = this.props;
        const userIsLoaded = user.isLoaded;

        if (
            (!prevProps.user.isLoaded && userIsLoaded) ||
            (!prevProps.userProfile.isLoaded && userProfile.isLoaded)
        ) {
            this.setProfileInformationIfAuthenticated();
        }
    }

    componentDidMount() {
        this.setProfileInformationIfAuthenticated();
    }

    handleConfirmPasswordModalSuccess = () => {
        this.toggleVerifyPasswordModal();
        this.updateEmailAndProfileInformation();
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // handleEmailUpdate = (e) => {

    // };

    // handlePasswordUpdate = (e) => {

    // };

    handleProfileUpdate = (e) => {
        e.preventDefault();
        this.updateEmailAndProfileInformation();
    };

    toggleVerifyPasswordModal() {
        this.setState({
            showVerifyPasswordModal: !this.state.showVerifyPasswordModal
        });
    }

    // handleProfileUpdate = async (e) => {
    updateEmailAndProfileInformation = async () => {
        const { firebase, firestore, user } = this.props;
        const { confirmPassword, email, firstName, lastName, newPassword} = this.state;
        // Confirm password matching
        if (newPassword && (confirmPassword !== newPassword)) {
            return this.setState({
                error: 'Confirm Password must match New Password.'
            })
        }

        try {
            console.log('firebase auth current user:', firebase.auth().currentUser);
            const firebaseAuthUser = firebase.auth().currentUser;
            console.log('user email:', user.email);
            console.log('email:', email);
            // todo: currentUser doesn't stay up-to-date with user's email after .updateEmail() is called
            if (user.email !== email) {
                // Firebase Authentication Request
                await firebaseAuthUser.updateEmail(email);
            }
            if (newPassword) {
                // Firebase Authentication Request
                await firebaseAuthUser.updatePassword(newPassword);
            }

            // Firestore request
            await firestore.collection('users').doc(user.uid).set({ firstName, lastName });

            this.setState({
                error: ''
            })
        } catch (error) {
            console.log('error:', error);
            if (error.code === 'auth/requires-recent-login') {
                return this.setState({
                    showVerifyPasswordModal: true
                });
            }
            this.setState({
                error: error.message
            });
        }
    };

    setProfileInformationIfAuthenticated() {
        const {userProfile, user} = this.props;
        const userIsLoaded = user.isLoaded;

        const stateToSet = {};
        if (userIsLoaded) {
            stateToSet.email = user.email;
        }

        if (userProfile.isLoaded) {
            stateToSet.firstName = userProfile.firstName;
            stateToSet.lastName = userProfile.lastName;
        }

        if (Object.keys(stateToSet).length) {
            this.setState(stateToSet);
        }
    }

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

                <form onSubmit={this.handleProfileUpdate}>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        onChange={this.handleInputChange}
                        type='text'
                        value={this.state.email}
                    />
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
                    <button type='submit'>Update Profile</button>
                </form>

                <form>
                    <label htmlFor='password'>New Password</label>
                    <input
                        id='newPassword'
                        name='newPassword'
                        onChange={this.handleInputChange}
                        type='password'
                    />
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        disabled={!this.state.newPassword}
                        id='confirmPassword'
                        name='confirmPassword'
                        onChange={this.handleInputChange}
                        type='password'
                    />
                </form>
                {this.state.showVerifyPasswordModal &&
                    <VerifyPasswordModal
                        onSuccess={this.handleConfirmPasswordModalSuccess}
                        toggleModal={this.toggleVerifyPasswordModal}
                        userEmail={this.props.user.email}
                    />
                }
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