import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Ensure this points to your Rails server
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

export interface User {
    id: string;
    name: string;
    email: string;
    profileImage: string;
}

// Authentication
export const authenticate = (credentials) => api.post('/users/authenticate', credentials);
export const register = (user: User) => api.post('/users', user);

// Artifacts
export const fetchArtifacts = () => api.get('/artifacts');
export const loadArtifact = (id) => api.get(`/artifacts/${id}`);
export const createArtifact = (artifact) => api.post('/artifacts', artifact);
export const updateArtifact = (id, artifact) => api.put(`/artifacts/${id}`, artifact);
export const deleteArtifact = (id) => api.delete(`/artifacts/${id}`);

// Items
export const fetchItems = () => api.get('/items');
export const loadItem = () => api.get('/items');
export const createItem = (item) => api.post('/items', item);
export const updateItem = (id, item) => api.put(`/items/${id}`, item);
export const deleteItem = (id) => api.delete(`/items/${id}`);
export const loadUser = (userId: string) => api.get(`/users/${userId}`)
