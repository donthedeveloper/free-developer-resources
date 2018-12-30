import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { isAdmin } from '../Auth/Auth.utilities';
import ResourceForm from './ResourceForm/ResourceForm.react';
import { addResource, editResource, removeResource } from './ResourceTable.actions';
import './ResourceTable.styles.scss';

class Resources extends Component {

    state = {
        resourceBeingAdded: false,
        resourceBeingEdited: ''
    };

    addResource = (resource) => {
        this.props.addResource(resource);
        // todo: this assumes it was successful without checking
        this.toggleAddResource();
    };

    editResource = (resource) => {
        this.props.editResource(resource);
        // todo: this assumes it was successful without checking
        this.toggleEditResource();
    };

    toggleAddResource = () => {
        this.setState({
            resourceBeingAdded: !this.state.resourceBeingAdded
        });
    };

    toggleEditResource = (resourceId = '') => {
        this.setState({
            resourceBeingEdited: (resourceId !== this.state.resourceBeingEdited)
                ? resourceId
                : ''
        });
    };

    render() {
        const resources = this.props.resources;

        return (
            <div>
                <div>
                    { this.props.isAdmin &&
                        <i className="far fa-plus-square" onClick={this.toggleAddResource}></i>
                    }
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.resourceBeingAdded && 
                            <tr>
                                <td>
                                    <ResourceForm onSubmit={this.addResource} />
                                </td>
                            </tr>
                        }
                        {resources && resources.map((resource) =>
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
                                { this.props.isAdmin &&
                                    <td>
                                        <i className='far fa-edit' onClick={() => this.toggleEditResource(resource.id)}></i>
                                        <i className='far fa-trash-alt' onClick={() => this.props.removeResource(resource.id)}></i>
                                    </td>
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    } 
};

const mapStateToProps = state => ({
    resources: state.firestore.ordered.resources,
    isAdmin: isAdmin(state.firestore.ordered.permissions, state.firebase.auth.uid)
});

const mapDispatchToProps = dispatch => ({
    addResource: resource => dispatch(addResource(resource)),
    removeResource: (resourceId) => dispatch(removeResource(resourceId)),
    editResource: (resource) => dispatch(editResource(resource))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'permissions' },
        { collection: 'resources', orderBy: ['createdAt', 'desc'] }
    ])
)(Resources);