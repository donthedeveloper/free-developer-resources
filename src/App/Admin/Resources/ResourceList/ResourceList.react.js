import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ResourceList extends Component {
    render() {
        const resources = this.props.resources;
        if (!resources) {
            return null;
        }

        return (
            <ul>
            {resources.map((resource) =>
                <li key={resource.id}>{resource.name}</li>
            )}
            </ul>
        );
    }
};

const mapStateToProps = (state) => ({
    resources: state.firestore.ordered.resources
})

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'resources' }
    ])
)(ResourceList);