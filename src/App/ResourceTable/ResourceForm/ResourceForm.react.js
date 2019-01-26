import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

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
            error: '',
            name: resource ? resource.name : '',
            url: resource ? resource.url : ''
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: name === 'difficulty' ? Number(value) : value
        });
    };

    isResourceNameDuplicate = () => {
        const resourceBeingEdited = this.props.resource;
        return this.props.firestoreData.ordered.resources.some((resource) => {
            if (resourceBeingEdited) {
                return resourceBeingEdited.id !== resource.id && (resource.name === this.state.name);
            } else {
                return resource.name === this.state.name;
            }
        });
    };

    isSubmitDisabled = () => {
        const { category, description, difficulty, name, url } = this.state;
        if (category && description && difficulty && name && url) {
            return false;
        }
        return true;
    };

    save = (e) => {
        e.preventDefault();
        const resource = this.props.resource;
        const { error, ...resourceToSave } = this.state;
        if (resource) {
            resourceToSave.id = resource.id
        }

        if (this.isResourceNameDuplicate()) {
            this.setState({
                error: 'Resource name should be unique.'
            });
        } else {
            this.props.onSubmit(resourceToSave);
            // todo: clear state mainly for adding a new resource
            // todo: this assumes it was successful without checking
            this.setState({
                category: 'frontend',
                description: '',
                difficulty: 1,
                error: '',
                name: '',
                url: ''
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.save}>
                <p>{this.state.error}</p>
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
                <button disabled={this.isSubmitDisabled()} type='submit'>Save</button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    firestoreData: state.firestore
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'resources' }
    ]),
    withRouter
)(ResourceForm);