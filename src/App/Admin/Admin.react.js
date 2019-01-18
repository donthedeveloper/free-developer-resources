import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { isAdmin } from '../Auth/Auth.utilities';
import ResourceTable from '../ResourceTable/ResourceTable.react';

const Admin = (props) => {
    if (props.isLoadingPermissions) {
        return <i className="fas fa-spinner"></i>;
    }

    if (!props.isAdmin) {
        return <Redirect to={`/signin`} />
    }

    return (
        <Switch>
            {/* <Route exact path='/blog' component={Blog} /> */}
            <Route path={`${props.match.url}/resources`} component={ResourceTable} />
            <Redirect to={`${props.match.url}/resources`} />
        </Switch>
    );
};

Admin.defaultProps = {
    isLoadingPermissions: false
};

Admin.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    match: PropTypes.shape({
        url: PropTypes.string
    })
};

const mapStateToProps = state => ({
    isLoadingPermissions: state.firestore.status.requesting.permissions,
    isAdmin: isAdmin(state.firestore.ordered.permissions, state.firebase.auth.uid)
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'permissions' }])
)(Admin);