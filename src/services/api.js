import axios from "axios";

const api = axios.create({
  baseURL: "https://aircall-api.onrender.com",
});

export const getCalls = () => api.get("/activities");
export const archiveCall = (callId) =>
  api.patch(`/activities/${callId}`, { is_archived: true });
export const resetCalls = () => api.patch("/reset");
