export const createResource = (resource) =>
    (dispatch, getState, { getFirebase, getFirestore }) =>
        getFirestore().collection('resources').add({
            ...resource,
            createdAt: new Date()
        })
            // todo: possibly update success and failures messages?
            // OR figure out how to get 'getFirestore()` in the component (this would keep the flux flow)
            .then(() => dispatch({ type: 'CREATE_RESOURCE', resource }))
            .catch((error) => dispatch({ type: 'UPDATE_ERROR', error }));

// export const editResource = (resourceId) =>
//     (dispatch, getState, { getFirebase, getFirestore }) =>
//             getFirestore().collection('resources').doc(resourceId).update({

//             })

export const removeResource = (resourceId) =>
    (dispatch, getState, { getFirebase, getFirestore }) =>
        getFirestore().collection('resources').doc(resourceId).delete()
            .then(() => {
                dispatch({
                    type: 'DELETE_RESOURCE_SUCCESS'
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'DELETE_RESOURCE_ERROR'
                });
            });