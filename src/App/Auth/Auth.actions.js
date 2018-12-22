// todo: write action to clear error; clear error message on unmount

export const signIn = (credentials) =>
    (dispatch, getState, { getFirebase }) =>
        getFirebase().auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => dispatch({ type: 'SIGNIN_SUCCESS' }))
            .catch((error) => dispatch({ type: 'SIGNIN_ERROR', error}));

export const signOut = () =>
    (dispatch, getState, { getFirebase }) =>
        getFirebase().auth().signOut()
            .then(() => dispatch({ type: 'SIGNOUT_SUCCESS' }));

export const signUp = (newUser) =>
    (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        )
            .then((response) => {
                return firestore.collection('users').doc(response.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                })
            })
            .then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' })
            })
            .catch((error => {
                console.log(error);
                dispatch({ type: 'SIGNUP_ERROR', error })
            }));
    }