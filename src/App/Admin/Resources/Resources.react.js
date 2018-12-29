import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ResourceForm from './ResourceForm/ResourceForm.react';
import { addResource, editResource, removeResource } from './Resources.actions';
import './Resources.styles.scss';

class Resources extends Component {

    static defaultProps = {
        resources: []
    };

    state = {
        resourceBeingAdded: '',
        resourceBeingEdited: ''
    };

    addResource = (resource) => {
        this.props.addResource(resource);
        // todo: this assumes it was successful without checking
        this.toggleEditResource();
    };

    // saveResourceBeingEdited = () => {
    editResource = (resource) => {
        this.props.editResource(resource);
        // todo: this assumes it was successful without checking
        this.toggleEditResource();
    };

    toggleAddResource(resourceId = '') {
        this.setState({
            resourceBeingAdded: resourceId
        });
    }

    toggleEditResource(resourceId = '') {
        this.setState({
            resourceBeingEdited: resourceId
        });
    }

    render() {
        const resources = this.props.resources;

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            {/* <th>Difficulty</th> */}
                            {/* <th>Rating</th> */}
                            {/* <th>Submitted By</th> */}
                            <th>Name</th>
                            <th>Description</th>
                            <th>Admin</th>
                        </tr>
                        {this.props.resources && this.props.resources.map((resource) =>
                            <tr key={resource.id}>
                                {
                                    (this.state.resourceBeingEdited && resource.id === this.state.resourceBeingEdited)
                                        ? (
                                            <td colSpan='2'>
                                                <ResourceForm resource={resource} onSubmit={this.editResource} />
                                            </td>
                                        ) : (
                                            <Fragment>
                                                <td>{resource.name}</td>
                                                <td>{resource.description}</td>
                                            </Fragment>
                                        )
                                }
                                <td>
                                    <i className='far fa-edit' onClick={this.toggleEditResource}></i>
                                    <i className='far fa-trash-alt' onClick={() => this.props.removeResource(resource.id)}></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    } 
};

const mapStateToProps = state => ({
    resources: state.firestore.ordered.resources
});

const mapDispatchToProps = dispatch => ({
    addResource: resource => dispatch(addResource(resource)),
    removeResource: (resourceId) => dispatch(removeResource(resourceId)),
    editResource: (resource) => dispatch(editResource(resource))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'resources',
            orderBy: ['createdAt', 'desc']
        }
    ])
)(Resources);