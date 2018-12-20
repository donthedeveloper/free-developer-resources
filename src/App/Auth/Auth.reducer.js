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
            return state;
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                error: ''
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                error: action.error.message
            }
        default:
            return state;
    }
}

export default authReducer;