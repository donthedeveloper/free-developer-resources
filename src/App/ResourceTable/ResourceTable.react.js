import classNames from 'classnames';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
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

        if (this.state.resourceBeingEdited) {
            this.toggleEditResource();
        }
    };

    toggleEditResource = (resourceId = '') => {
        this.setState({
            resourceBeingEdited: (resourceId !== this.state.resourceBeingEdited)
                ? resourceId
                : ''
        });

        if (this.state.resourceBeingAdded) {
            this.toggleAddResource();
        }
    };

    filterResourcesbyCategory = () => {
        const category = this.props.match.params.category;
        return this.props.firestoreData.ordered.resources.filter((resource) => resource.category === category);
    };

    render() {
        if (!this.props.firestoreData.status.requested.resources) {
            return <i className="fas fa-spinner"></i>;
        }

        const category = this.props.match.params.category;
        const isAdmin = this.props.isAdmin;
        const numOfFormColumns = isAdmin ? 4 : 3;
        const resources = this.props.filterByCategory
            ? this.filterResourcesbyCategory()
            : this.props.firestoreData.ordered.resources;

        const tableHeaderClassName = classNames('resource-table__header', {
            'resource-table__header--ux': category === 'ux',
            'resource-table__header--frontend': category === 'frontend',
            'resource-table__header--backend': category === 'backend',
            'resource-table__header--foundations': category === 'foundations'
        });

        return (
            <div className='resource-table'>
                <div className={tableHeaderClassName}>
                    {this.props.match.params.category
                        && <h1 className='resource-table__heading'>{category} Resources</h1>
                    }
                    { isAdmin &&
                        <i className="far fa-plus-square" onClick={this.toggleAddResource}></i>
                    }
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            { isAdmin && <th>URL</th> }
                            <th>Description</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.resourceBeingAdded && 
                            <tr>
                                <td colSpan={numOfFormColumns}>
                                    <ResourceForm onSubmit={this.addResource} />
                                </td>
                            </tr>
                        }
                        {resources.map((resource) =>
                            <tr key={resource.id}>
                                {
                                    (this.state.resourceBeingEdited && resource.id === this.state.resourceBeingEdited)
                                        ? (
                                            <td colSpan={numOfFormColumns}>
                                                <ResourceForm resource={resource} onSubmit={this.editResource} />
                                            </td>
                                        ) : (
                                            <Fragment>
                                                <td>{resource.name}</td>
                                                <td>{resource.category}</td>
                                                <td>{resource.description}</td>
                                            </Fragment>
                                        )
                                }
                                { isAdmin &&
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
    firestoreData: state.firestore,
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
    ]),
    withRouter
)(Resources);