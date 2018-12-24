import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Resources = (props) => {
    const resources = props.resources;
    return (
        <ul>
            {resources && props.resources.map((resource) =>
                <li key={resource.id}>{resource.name}</li>
            )}
        </ul>
    );
};

const mapStateToProps = (state) => ({
    resources: state.firestore.ordered.resources
})

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'resources',
            orderBy: ['createdAt', 'desc']
        }
    ])
)(Resources);