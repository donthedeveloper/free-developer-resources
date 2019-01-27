import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Form from './Form/Form.react';

class ForgotPassword extends Component {

    static propTypes = {
        firebase: PropTypes.shape({
            auth: PropTypes.func.isRequired
        })
    };

    state = {
        error: '',
        wasSuccessfullySubmitted: false
    };

    handleSubmit = (email) => {
        this.props.firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                if (this.state.error) {
                    this.setState({
                        error: ''
                    });
                }
                this.setState({
                    wasSuccessfullySubmitted: true
                });
            })
            .catch(({ message }) => {
                this.setState({
                    error: message
                });
            });
    };

    render() {
        const error = this.state.error;
        return (
            <div>
                <h1>Forgot Password</h1>
                { error && <p>{error}</p> }
                { this.state.wasSuccessfullySubmitted
                    ? <p>
                        Password reset instructions have been sent to the email address you provided. 
                        Once you reset your password, <Link to='/login'>return to the login form</Link> to 
                        log in with your new password.
                    </p>
                    : <Form onSubmit={this.handleSubmit} />
                }
            </div>
        );
    }
}

export default firestoreConnect()(ForgotPassword);