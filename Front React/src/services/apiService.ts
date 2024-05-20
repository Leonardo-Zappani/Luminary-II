import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

export const fetchActivities = () => api.get('/activities');
export const createActivity = (activity) => api.post('/activities', activity);
export const updateActivity = (id, activity) => api.put(`/activities/${id}`, activity);
export const deleteActivity = (id) => api.delete(`/activities/${id}`);

export const fetchArtifacts = () => api.get('/artifacts');
export const createArtifact = (artifact) => api.post('/artifacts', artifact);
export const updateArtifact = (id, artifact) => api.put(`/artifacts/${id}`, artifact);
export const deleteArtifact = (id) => api.delete(`/artifacts/${id}`);
