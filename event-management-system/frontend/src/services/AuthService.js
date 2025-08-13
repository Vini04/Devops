import axios from "axios"; // to make HTTP requests to the backend APIs.

const API_URL = "http://localhost:8080/api/auth/"; // Base URL for all authentication-related API calls (login/signup)

const login = async (credentials) => {
    const response = await axios.post(API_URL + 'signin', credentials); // Sends user credentials to /signin API for login.
    // If token received, store it in browser's localStorage for session persistence.
    if (response.data.token) {
        localStorage.setItem('token', response.data.token); // store token
    }
    return response.data;
};

const register = async (userData) => {
    return await axios.post(API_URL + 'signup', userData); // Sends user signup data to /signup API for registration.
};

const logout = () => {
    localStorage.removeItem('token'); // Removes token from localStorage on logout.
};

const getToken = () => {
    return localStorage.getItem('token'); // Retrieves stored token for authenticated requests (e.g., for headers).
};

const saveToken = (token) => {
    localStorage.setItem('token', token);
};

// Exports all functions to be used in other components like Login, Register, etc.
export default {
    login, 
    register,
    logout, 
    getToken,
    saveToken
};