export const createResource = (resource) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('resources').add({
            ...resource,
            createdAt: new Date()
        })
            // todo: possibly update success and failures messages?
            // OR figure out how to get 'getFirestore()` in the component (this would keep the flux flow)
            .then(() => {
                dispatch({
                    type: 'CREATE_RESOURCE',
                    resource
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'UPDATE_ERROR',
                    error
                })
            });
    }
};