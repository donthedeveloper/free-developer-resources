import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class Form extends PureComponent {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    state = {
        email: ''
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.email);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    name='email'
                    onChange={this.handleInputChange}
                    type='text'
                />
                <input type='submit' value='Reset My Password'/>
            </form>
        );
    }
};