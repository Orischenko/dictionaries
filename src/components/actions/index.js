import {
    AUTH_START,
    AUTH_END,
    AUTH_FAIL,
    AUTH_SUCCESS,
    SIGN_OUT,
    CLEAN_ERROR_MESSAGES,
    POST_DICTIONARY_START,
    POST_DICTIONARY_FAIL,
    POST_DICTIONARY_SUCCESS,
    POST_DICTIONARY_END,
    DELETE_DICTIONARY_START,
    DELETE_DICTIONARY_SUCCESS,
    DELETE_DICTIONARY_FAIL,
    DELETE_DICTIONARY_END,
} from '../constants'
import { getRandomId } from '../helpers'

//Sign up async action
export const signUp = (data) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    dispatch({ type: AUTH_START });

    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

        await firestore.collection('users').doc(res.user.uid).set({
            firstName: data.firstName,
            lastName: data.lastName,
        });

        dispatch({ type: AUTH_SUCCESS });

    } catch (e)  {
        console.error( e.message );
        dispatch({ type: AUTH_FAIL, payload: e.message  });
    }

    dispatch({ type: AUTH_END  });
};

//LoginPage in async action
export const signIn = (data) => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    dispatch({ type: AUTH_START });

    try {
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        dispatch({ type: AUTH_SUCCESS });

    } catch (e)  {
        console.error( e.message );
        dispatch({ type: AUTH_FAIL, payload: e.message  });
    }

    dispatch({ type: AUTH_END  });
};

//Logout out async action
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
        await firebase.auth().signOut();
        dispatch({ type: SIGN_OUT });

    } catch (e) {
        console.error( e.message );
    }
};

//Clean up messages
export const clear = () => ({
    type: CLEAN_ERROR_MESSAGES
});

//Post dictionary async action
export const postDictionary = (data) => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const { name='', description='', complexity='', wordList='', language='' } = data;

    const res = await firestore.collection('dictionaries').doc(userId).get();
    const prevDictionaries = res.data() && res.data().dictionaries ? res.data().dictionaries : [];

    const newDictionaries = {
        id: getRandomId(),
        name,
        description,
        complexity,
        wordList,
        language,
    };

    dispatch({ type: POST_DICTIONARY_START });

    try {
        if (!prevDictionaries.length) {
            await firestore.collection('dictionaries').doc(userId).set({
                dictionaries: [newDictionaries],
            });
        } else {
            await firestore.collection('dictionaries').doc(userId).update({
                dictionaries: [...prevDictionaries, newDictionaries],
            });
        }

        dispatch({ type: POST_DICTIONARY_SUCCESS });

    } catch (e) {
        console.error( e.message );
        dispatch({ type: POST_DICTIONARY_FAIL, payload: e.message  });
    }

    dispatch({ type: POST_DICTIONARY_END  });
};

//Delete dictionary async action
export const deleteDictionary = (id) => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const res = await firestore.collection('dictionaries').doc(userId).get();
    const prevDictionaries = res.data().dictionaries;

    dispatch({ type: DELETE_DICTIONARY_START  });

    try {
        await firestore.collection('dictionaries').doc(userId).set({
            dictionaries: prevDictionaries.filter(dict => dict.id !== id),
        });

        dispatch({ type: DELETE_DICTIONARY_SUCCESS  });
    } catch (e) {
        console.error( e.message );
        dispatch({ type: DELETE_DICTIONARY_FAIL, payload: e.message  });
    }
};

//Edit dictionary async action
export const editDictionary = (data) => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    const res = await firestore.collection('dictionaries').doc(userId).get();
    const prevDictionaries = res.data().dictionaries;
    const dictionaryIndex = res.data().dictionaries.findIndex(d => d.id === data.id);

    prevDictionaries[dictionaryIndex] = data;

    dispatch({ type: 'EDIT_DICTIONARY' });

    try {
        await firestore.collection('dictionaries').doc(userId).update({
            dictionaries: prevDictionaries,
        });

    } catch (e) {
        console.error( e.message );
        dispatch({ type: 'EDIT_DICTIONARY_FAIL', payload: e.message  });
    }

    dispatch({ type: 'EDIT_DICTIONARY_END'  });
};

export const openModal = (id) => ({
    type: 'OPEN_MODAL',
    payload: id,
});

export const closeModal = () => ({
    type: 'CLOSE_MODAL',
});