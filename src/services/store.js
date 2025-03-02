import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const GET_CALLS_SUCCESS = "GET_CALLS_SUCCESS";
export const GET_CALLS_FAILURE = "GET_CALLS_FAILURE";

export const SET_ARCHIVE_SUCCESS = "SET_ARCHIVE_SUCCESS";
export const SET_ARCHIVE_FAILURE = "SET_ARCHIVE_FAILURE";

export const SET_UNARCHIVE_SUCCESS = "SET_UNARCHIVE_SUCCESS";
export const SET_UNARCHIVE_FAILURE = "SET_UNARCHIVE_FAILURE";

export const ARCHIVE_ALL_SUCCESS = "ARCHIVE_ALL_SUCCESS";
export const ARCHIVE_ALL_FAILURE = "ARCHIVE_ALL_FAILURE";

export const UNARCHIVE_ALL_SUCCESS = "UNARCHIVE_ALL_SUCCESS";
export const UNARCHIVE_ALL_FAILURE = "UNARCHIVE_ALL_FAILURE";

const initialState = {
    calls: [],
    archives: [],
    error: null
}

const reducer = (state = initialState, action) => {
    if (action.type === GET_CALLS_SUCCESS)
        return { ...state, calls: action.payload, archives: action.payload.filter((call) => call.is_archived) };

    else if (action.type === GET_CALLS_FAILURE)
        return { ...state, error: action.payload };

    else if (action.type === SET_ARCHIVE_SUCCESS) {
        return {
            ...state,
            calls: state.calls.filter((call) => call.id !== action.payload),
            archives: state.archives
        };
    }

    else if (action.type === SET_ARCHIVE_FAILURE)
        return { ...state, error: action.payload };

    else if (action.type === SET_UNARCHIVE_SUCCESS)
        return { ...state, calls: [...state.calls], archives: state.archives.filter((call) => call.id !== action.payload) };

    else if (action.type === SET_UNARCHIVE_FAILURE)
        return { ...state, error: action.payload };

    else if (action.type === ARCHIVE_ALL_SUCCESS)
        return { ...state, calls: [], archives: [...state.calls, ...state.archives].filter(call => call.is_archived) }

    else if (action.type === UNARCHIVE_ALL_SUCCESS)
        return { ...state, calls: [...state.calls, ...state.archives].filter(call => !call.is_archived), archives: [] }

    else return state;
}

const store = createStore(reducer, applyMiddleware(thunk, logger));

export { store };