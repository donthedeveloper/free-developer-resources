import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createResource } from '../Resources.actions';

class CreateResource extends Component {

    state = {
        name: '',
        url: '',
        description: ''
    };

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.createResource(this.state)
        // todo: this automatically assumes it was successful (bad)
        // possibly lean on a success or failure modal sliding up and out, and then redirecting in componentDidUpdate
        this.props.history.push('/admin/resources');
    };

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    name='name'
                    onChange={this.handleInputChange}
                    type='text'
                    value={this.state.name}
                />
                <label htmlFor='url'>URL</label>
                <input
                    id='url'
                    name='url'
                    onChange={this.handleInputChange}
                    type='text'
                    value={this.state.url}
                />
                <label htmlFor='description'>Description</label>
                <input
                    id='description'
                    name='description'
                    onChange={this.handleInputChange}
                    type='text'
                    value={this.state.description}
                />
                <button type='submit'>Create</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createResource: resource => dispatch(createResource(resource))
})

export default compose(
    connect(null, mapDispatchToProps),
    withRouter
)(CreateResource);