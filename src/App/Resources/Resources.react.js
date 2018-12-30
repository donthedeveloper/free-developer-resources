import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ResourceTable from '../ResourceTable/ResourceTable.react';

const Resources = (props) => {
    const resources = props.resources;
    return <ResourceTable />;
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