import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import firebaseConfig from './config/firebaseConfig';
import rootReducer from './rootReducer';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import App from './App/App.react';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            createLogger({ collapsed: true }),
            thunk.withExtraArgument({
                getFirebase,
                getFirestore
            })
        ),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();