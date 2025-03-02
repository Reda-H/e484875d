import axios from "axios";
import {
    GET_CALLS_FAILURE,
    GET_CALLS_SUCCESS,
    SET_ARCHIVE_FAILURE,
    SET_ARCHIVE_SUCCESS,
    SET_UNARCHIVE_FAILURE,
    SET_UNARCHIVE_SUCCESS,
    ARCHIVE_ALL_SUCCESS,
    ARCHIVE_ALL_FAILURE,
    UNARCHIVE_ALL_SUCCESS,
    UNARCHIVE_ALL_FAILURE
} from "./store";

const api = axios.create({
    baseURL: "https://aircall-api.onrender.com",
});

export const getCalls = () => (dispatch) => {
    api.get("/activities")
        .then(res => dispatch({ type: GET_CALLS_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: GET_CALLS_FAILURE, payload: err.message }));
}

export const setArchiveCall = (callId) => (dispatch) => {
    api.patch(`/activities/${callId}`, { is_archived: true })
        .then(res => dispatch({ type: SET_ARCHIVE_SUCCESS, payload: callId }))
        .catch(err => dispatch({ type: SET_ARCHIVE_FAILURE, payload: err.message }));
}

export const setUnarchiveCall = (callId) => (dispatch) => {
    api.patch(`/activities/${callId}`, { is_archived: false })
        .then(res => dispatch({ type: SET_UNARCHIVE_SUCCESS, payload: callId }))
        .catch(err => dispatch({ type: SET_UNARCHIVE_FAILURE, payload: err.message }));
}

export const archiveAllCalls = (callIds) => (dispatch) => {
    const archiveRequests = callIds.map(callId =>
        api.patch(`/activities/${callId}`, { is_archived: true })
            .then(res => ({ success: true, callId })) // Track successful requests
            .catch(err => ({ success: false, callId, error: err.message })) // Track failed requests
    );
    Promise.all(archiveRequests)
        .then(results => {
            const successfulArchives = results.filter(result => result.success);
            const failedArchives = results.filter(result => !result.success);

            dispatch({ type: ARCHIVE_ALL_SUCCESS, payload: successfulArchives.map(result => result.callId) });

            if (failedArchives.length > 0) {
                dispatch({
                    type: ARCHIVE_ALL_FAILURE,
                    payload: failedArchives.map(result => ({ callId: result.callId, error: result.error }))
                });
            }
        })
        .catch(err => {
            dispatch({ type: ARCHIVE_ALL_FAILURE, payload: [{ error: err.message }] });
        });
};


export const unarchiveAllCalls = (callIds) => (dispatch) => {
    const archiveRequests = callIds.map(callId =>
        api.patch(`/activities/${callId}`, { is_archived: false })
            .then(res => ({ success: true, callId })) // Track successful requests
            .catch(err => ({ success: false, callId, error: err.message })) // Track failed requests
    );
    Promise.all(archiveRequests)
        .then(results => {
            const successfulArchives = results.filter(result => result.success);
            const failedArchives = results.filter(result => !result.success);

            dispatch({ type: UNARCHIVE_ALL_SUCCESS, payload: successfulArchives.map(result => result.callId) });

            if (failedArchives.length > 0) {
                dispatch({
                    type: UNARCHIVE_ALL_FAILURE,
                    payload: failedArchives.map(result => ({ callId: result.callId, error: result.error }))
                });
            }
        })
        .catch(err => {
            dispatch({ type: UNARCHIVE_ALL_FAILURE, payload: [{ error: err.message }] });
        });
};