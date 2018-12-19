import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './App/Auth/Auth.reducer';
// import resourcesReducer from './App/Admin/Resources/Resources.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
    // resources: resourcesReducer
});

export default rootReducer;