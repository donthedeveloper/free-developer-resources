import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../Auth/Auth.actions';

class Signup extends Component {

    state = {
        email: '',
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
        this.props.signUp(this.state);
    };

    render() {
        const { error, isLoggedIn } = this.props;

        if (isLoggedIn) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h1>Signup</h1>
                <p>{error}</p>
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
    error: state.auth.error,
    isLoggedIn: !!state.firebase.auth.uid
});

const mapDispatchToProps = dispatch => ({
    signUp: newUser => dispatch(signUp(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);