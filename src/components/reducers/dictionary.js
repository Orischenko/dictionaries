import {
    POST_DICTIONARY_START,
    POST_DICTIONARY_END,
    POST_DICTIONARY_FAIL,
    DELETE_DICTIONARY_START,
    DELETE_DICTIONARY_END,
    DELETE_DICTIONARY_FAIL
} from '../constants'

const defaultModel = {
    error: null,
    loading: false,
    editId: null,
    openModalId: null,
    deleteTodo: {
        error: null,
        loading: false,
    },
};

export default (state = defaultModel, { type, payload }) => {
    switch (type) {
        case POST_DICTIONARY_START:
            return {
                ...state,
                loading: true,
            };
        case POST_DICTIONARY_END:
            return {
                ...state,
                loading: false,
            };
        case POST_DICTIONARY_FAIL:
            return {
                ...state,
                error: payload,
            };
        case DELETE_DICTIONARY_START:
            return {
                ...state,
                deleteTodo: { loading: true }
            };
        case DELETE_DICTIONARY_END:
            return {
                ...state,
                deleteTodo: { loading: false }
            };
        case DELETE_DICTIONARY_FAIL:
            return {
                ...state,
                deleteTodo: { error: payload }
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                openModalId: payload,
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                openModalId: null,
            };
        default:
            return state
    }
}