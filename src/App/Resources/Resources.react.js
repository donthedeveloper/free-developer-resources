import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ResourceTable from '../ResourceTable/ResourceTable.react';
import './Resources.styles.scss';

const Resources = (props) => {
    return (
        <div className='resources'>
            <h1 className='resources__heading'>{props.match.params.category} Resources</h1>
            <ResourceTable filterByCategory />
        </div>
    );
};

export default Resources;