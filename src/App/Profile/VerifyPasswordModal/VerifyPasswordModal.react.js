import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './VerifyPasswordModal.scss';

class VerifyPasswordModal extends PureComponent {

    static propTypes = {
        onSuccess: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired,
        userEmail: PropTypes.string.isRequired
    };

    state = {
        currentPassword: '',
        error: ''
    };

    handleInputChange = (e) => {
        this.setState({
            currentPassword: e.target.value
        });
    };

    handleReauthenticate = (e) => {
        e.preventDefault();
        const { firebase, onSuccess, userEmail } = this.props;
        const credentials = firebase.auth.EmailAuthProvider.credential(userEmail, this.state.currentPassword);

        firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credentials)
            .then(() => {
                this.setState({
                    error: '',
                    showPasswordField: false
                }, () => {
                    onSuccess();
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.message
                });
            });
    };

    render() {
        return (
            <div className='modal'>
                <div className='modal__content'>
                    <form onSubmit={this.handleReauthenticate}>
                        <p>{this.state.error}</p>
                        <input
                            id='currentPassword'
                            name='currentPassword'
                            onChange={this.handleInputChange}
                            type='password'
                            value={this.state.currentPassword}
                        />
                        <input type='submit' value='Confirm Password' />
                    </form>
                </div>
            </div>
        )
    }
}

export default compose(
    firestoreConnect()
)(VerifyPasswordModal);