import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../Auth/Auth.actions';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    };

    render() {
        return (
            <div>
                <h1>Sign In</h1>
                <p>{this.props.error}</p>
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
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    signIn: credentials => dispatch(signIn(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);