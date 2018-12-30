const initialState = [];

const resourcesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_RESOURCE':
            console.log('created resource:', action.resource);
            return state;
        case 'UPDATE_ERROR':
            console.log('error:', action.error);
            return state;
        default:
            return state;
    }
}

export default resourcesReducer;