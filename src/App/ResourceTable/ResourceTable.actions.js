export const addResource = (resource) =>
    (dispatch, getState, { getFirebase, getFirestore }) =>
        getFirestore().collection('resources').add({
            ...resource,
            createdAt: new Date()
        })
            .then(() => dispatch({ type: 'ADD_RESOURCE_SUCCESS', resource }))
            .catch((error) => dispatch({ type: 'ADD_RESOURCE_ERROR', error }));
            // .catch((error) => dispatch({ type: 'UPDATE_ERROR', error }));


export const editResource = (resource) =>
    (dispatch, getState, { getFirebase, getFirestore }) =>
            getFirestore().collection('resources').doc(resource.id).update({
                description: resource.description,
                name: resource.name,
                url: resource.url
            })
                .then(() => dispatch({ type: 'EDIT_RESOURCE_SUCCESS' }))
                .catch((error) => dispatch({ type: 'EDIT_RESOURCE_ERROR', error }));

export const removeResource = (resourceId) =>
    (dispatch, getState, { getFirebase, getFirestore }) =>
        getFirestore().collection('resources').doc(resourceId).delete()
            .then(() => dispatch({ type: 'DELETE_RESOURCE_SUCCESS' }))
            .catch((error) => dispatch({ type: 'DELETE_RESOURCE_ERROR', error }));