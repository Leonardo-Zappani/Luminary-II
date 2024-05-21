import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Ensure this points to your Rails server
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

// Authentication
export const authenticate = (credentials) => api.post('/authenticate', credentials);

// Artifacts
export const fetchArtifacts = () => api.get('/artifacts');
export const createArtifact = (artifact) => api.post('/artifacts', artifact);
export const updateArtifact = (id, artifact) => api.put(`/artifacts/${id}`, artifact);
export const deleteArtifact = (id) => api.delete(`/artifacts/${id}`);

// Actions
export const fetchActions = () => api.get('/actions');
export const createAction = (action) => api.post('/actions', action);
export const updateAction = (id, action) => api.put(`/actions/${id}`, action);
export const deleteAction = (id) => api.delete(`/actions/${id}`);

// Items
export const fetchItems = () => api.get('/items');
export const createItem = (item) => api.post('/items', item);
export const updateItem = (id, item) => api.put(`/items/${id}`, item);
export const deleteItem = (id) => api.delete(`/items/${id}`);
export const loadUser = (userId: string) => api.get(`/users/${userId}`)
