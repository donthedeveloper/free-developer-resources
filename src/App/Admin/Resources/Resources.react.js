import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ResourceForm from './ResourceForm/ResourceForm.react';
import { removeResource } from './Resources.actions';
import './Resources.styles.scss';

class Resources extends Component {

    static defaultProps = {
        resources: []
    };

    state = {
        resourceIsBeingEdited: false
    };

    saveResourceBeingEdited = () => {
        
        // todo: finished?
        this.toggleEditResource();
    };

    toggleEditResource() {
        this.setState({
            resourceIsBeingEdited: !resourceIsBeingEdited
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

                            {this.state.resourceIsBeingEdited
                                ? <ResourceForm resource={resource} onSubmit={this.saveResourceBeingEdited}
                            }

                            // <tr key={resource.id}>
                            //     <td>{resource.name}</td>
                            //     <td>{resource.description}</td>
                            //     <td>
                            //         <i className='far fa-edit' onClick={this.toggleEditResource}></i>
                            //         <i className='far fa-trash-alt' onClick={() => this.props.removeResource(resource.id)}></i>
                            //     </td>
                            // </tr>
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
    removeResource: (resourceId) => dispatch(removeResource(resourceId))
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