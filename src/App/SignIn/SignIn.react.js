import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class SignIn extends Component {

    static propTypes = {
        error: PropTypes.string,
        firebase: PropTypes.shape({
            auth: PropTypes.func.isRequired
        }),
        isLoggedIn: PropTypes.bool.isRequired,
    }

    state = {
        email: '',
        error: '',
        password: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.firebase.auth().signInWithEmailAndPassword(email, password)
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
                <h1>Sign In</h1>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleSubmit}>
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
                    <button type='submit'>Log In</button>
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
)(SignIn);