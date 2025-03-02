import axios from "axios";
import {
    GET_ARCHIVE_FAILURE,
    GET_ARCHIVE_SUCCESS,
    GET_CALLS_FAILURE,
    GET_CALLS_SUCCESS,
    SET_ARCHIVE_FAILURE,
    SET_ARCHIVE_SUCCESS,
    SET_UNARCHIVE_FAILURE,
    SET_UNARCHIVE_SUCCESS
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

export const getArchives = () => (dispatch) => {
    api.get("/activities")
        .then((res) => dispatch({ type: GET_ARCHIVE_SUCCESS, payload: res.data.filter((call) => call.is_archived) }))
        .catch((err) => dispatch({ type: GET_ARCHIVE_FAILURE, payload: err.message }));
}