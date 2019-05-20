import { combineReducers } from 'redux'
import authReducer from './auth'
import dictionaryReducer from './dictionary'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export default combineReducers({
    auth: authReducer,
    dictionary: dictionaryReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
})