import PropTypes from 'prop-types';
import React from 'react';
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

Resources.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            category: PropTypes.string.isRequired
        })
    })
};

export default Resources;