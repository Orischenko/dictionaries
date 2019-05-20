import { createStore, compose, applyMiddleware } from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import firebase from '../../firebase/firebase'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    attachAuthIsReady: true, // attaches auth is ready promise to store
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
);
const store = createStore(reducer, {}, enhancer);

export default store;