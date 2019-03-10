import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class Profile extends Component {

    state = {
        // most likely will be managed in modal
        currentPassword: '',
        currentPasswordError: '',

        email: '',
        error: '',
        firstName: '',
        lastName: '',
        oldPassword: '',
        newPassword: '',
        showPasswordField: false
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

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleEmailUpdate = (e) => {

    };

    handlePasswordUpdate = (e) => {

    };

    handleReauthenticate = (e) => {
        e.preventDefault();
        const { firebase, user } = this.props;
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, this.state.currentPassword);

        firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credentials)
            .then(() => {
                this.setState({
                    currentPasswordError: '',
                    showPasswordField: false
                }, () => {
                    this.updateEmailAndProfileInformation();
                });
            })
            .catch((error) => {
                this.setState({
                    currentPasswordError: error.message
                });
            });
    };

    handleProfileUpdate = (e) => {
        e.preventDefault();
        this.updateEmailAndProfileInformation();
    };

    // handleProfileUpdate = async (e) => {
    updateEmailAndProfileInformation = async () => {
        const { firebase, firestore, user } = this.props;
        const { email, firstName, lastName} = this.state;
        try {
            if (user.email !== email) {
                await firebase.auth().currentUser.updateEmail(email);
            }
            await firestore.collection('users').doc(user.uid).set({ firstName, lastName });

            this.setState({
                currentPasswordError: '',
                error: ''
            })
        } catch (error) {
            console.log('error:', error);
            if (error.code === 'auth/requires-recent-login') {
                return this.setState({
                    showPasswordField: true
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
                <p>{this.state.currentPasswordError}</p>

                {/* turn this into a modal as its own form that will recall handleProfileUpdate on success and have its own error message */}
                {this.state.showPasswordField &&
                    <Fragment>
                        <p>{this.state.error}</p>
                        <form onSubmit={this.handleReauthenticate}>
                            <input
                                id='currentPassword'
                                name='currentPassword'
                                onChange={this.handleInputChange}
                                type='password'
                                value={this.state.currentPassword}
                            />
                            <input type='submit' value='Confirm Password' />
                        </form>
                    </Fragment>
                }

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
                    <label htmlFor='oldPassword'>Old Password</label>
                    <input
                        id='oldPassword'
                        name='oldPassword'
                        onChange={this.handleInputChange}
                        type='password'
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        id='newPassword'
                        name='newPassword'
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