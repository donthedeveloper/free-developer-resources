import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { isAdmin } from '../Auth/Auth.utilities';
import ResourceForm from './ResourceForm/ResourceForm.react';
import './ResourceTable.scss';

class Resources extends Component {

    static propTypes = {
        filterByCategory: PropTypes.bool,
        firestore: PropTypes.shape({
            collection: PropTypes.func.isRequired
        }),
        firestoreData: PropTypes.shape({
            status: PropTypes.shape({
                requested: PropTypes.shape({
                    resources: PropTypes.bool
                }).isRequired
            }),
            ordered: PropTypes.shape({
                resources: PropTypes.array
            }).isRequired
        }),
        isAdmin: PropTypes.bool.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                category: PropTypes.string
            })
        })
    }

    state = {
        resourceBeingEdited: ''
    };

    addResource = (resource) => {
        this.props.firestore.collection('resources').add({
            ...resource,
            createdAt: new Date()
        })
        .catch((error) => {
            console.error(error);
        });
    };

    editResource = (resource) => {
        this.props.firestore.collection('resources').doc(resource.id).update({
            category: resource.category,
            description: resource.description,
            difficulty: resource.difficulty,
            name: resource.name,
            url: resource.url
        })
            .then(() => {
                this.toggleEditResource();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    filterResourcesbyCategory = () => {
        const category = this.props.match.params.category;
        return this.props.firestoreData.ordered.resources.filter((resource) => resource.category === category);
    };

    getDifficulty(num) {
        switch(num) {
            case 1:
                return 'Beginner';
            case 2:
                return 'Intermediate';
            case 3:
                return 'Advanced';
            default:
                return 'N/A';
        }
    }

    removeResource(resource) {
        if (window.confirm(`Are you sure you want to delete the resource: ${resource.name}`)) {
            this.props.firestore.collection('resources').doc(resource.id).delete()
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    toggleEditResource = (resourceId = '') => {
        this.setState({
            resourceBeingEdited: (resourceId !== this.state.resourceBeingEdited)
                ? resourceId
                : ''
        });
    };

    render() {
        if (!this.props.firestoreData.status.requested.resources) {
            return <i className="fas fa-spinner"></i>;
        }

        const category = this.props.match.params.category;
        const isAdmin = this.props.isAdmin;
        const numOfFormColumns = isAdmin ? 5 : 3;
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
            <table className='resource-table'>
                <thead className={tableHeaderClassName}>
                    <tr>
                        <th className='resource-table__column resource-table__column--header'>Name</th>
                        { isAdmin &&
                            <th className='resource-table__column resource-table__column--header'>Category</th>
                        }
                        <th className='resource-table__column resource-table__column--header'>Difficulty</th>
                        { isAdmin && <th className='resource-table__column resource-table__column--header'>URL</th> }
                        <th className='resource-table__column resource-table__column--header'>Description</th>
                        { isAdmin && <th className='resource-table__column resource-table__column--header'>Admin</th> }
                    </tr>
                </thead>
                <tbody>
                    { isAdmin &&
                        <tr>
                            <td colSpan={numOfFormColumns}>
                                <ResourceForm onSubmit={this.addResource} />
                            </td>
                        </tr>
                    }
                    {resources.map((resource) =>
                        <tr className='resource-table__row' key={resource.id}>
                            {
                                (this.state.resourceBeingEdited && resource.id === this.state.resourceBeingEdited)
                                    ? (
                                        <td colSpan={numOfFormColumns}>
                                            <ResourceForm resource={resource} onSubmit={this.editResource} />
                                        </td>
                                    ) : (
                                        <Fragment>
                                            <td className='resource-table__column resource-table__column--name'>{resource.name}</td>
                                            { isAdmin &&
                                                <td className='resource-table__column resource-table__column--category'>{resource.category}</td>
                                            }
                                            <td className='resource-table__column resource-table__column--difficulty'>{this.getDifficulty(resource.difficulty)}</td>
                                            { isAdmin &&
                                                <td className='resource-table__column resource-table__column--url'>{resource.url}</td>
                                            }
                                            <td className='resource-table__column resource-table__column--description'>{resource.description}</td>
                                        </Fragment>
                                    )
                            }
                            { isAdmin &&
                                <td className='resource-table__column resource-table__column--admin'>
                                    <i className='far fa-edit' onClick={() => this.toggleEditResource(resource.id)}></i>
                                    <i className='far fa-trash-alt' onClick={() => this.removeResource(resource)}></i>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        );
    } 
};

const mapStateToProps = state => ({
    firestoreData: state.firestore,
    isAdmin: isAdmin(state.firestore.ordered.permissions, state.firebase.auth.uid)
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'permissions' },
        { collection: 'resources', orderBy: ['createdAt', 'desc'] }
    ]),
    withRouter
)(Resources);