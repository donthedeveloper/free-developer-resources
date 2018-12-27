import React, { Component } from 'react';

class ResourceForm extends Component {

    constructor(props) {
        super(props);
        const resource = props.resource;
        this.state = {
            description: resource ? resource.description : '',
            name: resource ? resource.name : ''
        }
    }

    save(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.save}>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    type='text'
                    value={this.state.name}
                />
                <label htmlFor='description'>Description</label>
                <input
                    id='description'
                    type='text'
                    value={this.state.description}
                />
                <button type='submit'>Save</button>
            </form>
        );
    }
}

export default ResourceForm;