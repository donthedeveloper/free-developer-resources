const initialState = {
    error: ''
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGNIN_ERROR':
            return {
                ...state,
                error: 'Login failed'
            }
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                error: ''
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        default:
            return state;
    }
}

export default authReducer;