import React, { Component } from 'react';

class ResourceForm extends Component {

    constructor(props) {
        super(props);
        const resource = props.resource;
        this.state = {
            description: resource ? resource.description : '',
            name: resource ? resource.name : '',
            url: resource ? resource.url : ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    save = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <form onSubmit={this.save}>
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
                <button type='submit'>Save</button>
            </form>
        );
    }
}

export default ResourceForm;