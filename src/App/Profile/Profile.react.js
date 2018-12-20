import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to='/signin' />
        }

        return null;
    }
}

const mapStateToProps = state => ({
    isLoggedIn: !!state.firebase.auth.uid
});

export default connect(mapStateToProps)(Profile);