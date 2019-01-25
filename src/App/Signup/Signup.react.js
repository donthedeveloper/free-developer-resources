import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class Signup extends Component {

    static propTypes = {
        error: PropTypes.string,
        firebase: PropTypes.shape({
            auth: PropTypes.func.isRequired
        }),
        firestore: PropTypes.shape({
            collection: PropTypes.func.isRequired
        }),
        isLoggedIn: PropTypes.bool.isRequired
    }

    state = {
        email: '',
        error: '',
        firstName: '',
        lastName: '',
        password: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { firebase, firestore } = this.props;
        const { email, firstName, lastName, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                return firestore.collection('users').doc(response.user.uid).set({ firstName, lastName })
            })
            .catch(({ message }) => {
                this.setState({
                    error: message
                });
            });
    };

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h1>Signup</h1>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        id='firstName'
                        name='firstName'
                        onChange={this.handleInputChange}
                        type='text'
                    />
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        id='lastName'
                        name='lastName'
                        onChange={this.handleInputChange}
                        type='text'
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        onChange={this.handleInputChange}
                        type='text'
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
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: !!state.firebase.auth.uid
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect()
)(Signup);