import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ResourceForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        resource: PropTypes.shape({
            category: PropTypes.string,
            description: PropTypes.string,
            difficulty: PropTypes.oneOf([1, 2, 3]),
            name: PropTypes.name,
            url: PropTypes.url
        })
    }

    constructor(props) {
        super(props);
        const resource = props.resource;
        this.state = {
            category: resource ? resource.category : 'frontend',
            description: resource ? resource.description : '',
            difficulty: resource ? resource.difficulty : 1,
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
        const resource = this.props.resource;

        const resourceToSave = {
            ...this.state
        };
        if (resource) {
            resourceToSave.id = resource.id
        }

        this.props.onSubmit(resourceToSave);
        // todo: clear state mainly for adding a new resource
        // todo: this assumes it was successful without checking
        this.setState({
            category: 'frontend',
            description: '',
            difficulty: 1,
            name: '',
            url: ''
        })
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
                <label htmlFor='category'>Category</label>
                <select
                    id='category'
                    name='category'
                    onChange={this.handleInputChange}
                    value={this.state.category}
                >
                    <option value='ux'>UX & Design</option>
                    <option value='frontend'>Frontend</option>
                    <option value='backend'>Backend</option>
                    <option value='foundations'>Foundations</option>
                </select>
                <label htmlFor='difficulty'>Difficulty</label>
                <select
                    id='difficulty'
                    name='difficulty'
                    onChange={this.handleInputChange}
                    value={this.state.difficulty}
                >
                    <option value='1'>Easy</option>
                    <option value='2'>Intermediate</option>
                    <option value='3'>Advanced</option>
                </select>
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