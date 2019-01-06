import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ResourceTable from '../ResourceTable/ResourceTable.react';

const Resources = () => {
    return <ResourceTable filterByCategory />;
};

export default Resources;