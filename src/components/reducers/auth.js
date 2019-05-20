import { AUTH_START, AUTH_END, AUTH_FAIL, SIGN_OUT, CLEAN_ERROR_MESSAGES } from '../constants'

const defaultModel = {
    error: null,
    loading: false,
};

export default (state = defaultModel, { type, payload }) => {
    switch (type) {
        case AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case AUTH_END:
            return {
                ...state,
                loading: false,
            };
        case AUTH_FAIL:
            return {
                ...state,
                error: payload,
            };
        case SIGN_OUT:
            return {
                ...state,
            };
        case CLEAN_ERROR_MESSAGES:
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}