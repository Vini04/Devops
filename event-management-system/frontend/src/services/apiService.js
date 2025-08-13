import axios from "axios";
import AuthService from '../services/AuthService';

const API_BASE = 'http://localhost:8080/api';// because Spring Boot is running locally on port 8080), so no need to change this.

// ensures your request to GET /api/events has the proper header
export const fetchEvents = async () => {
  const token = AuthService.getToken();
  // Make sure token does NOT include "Bearer " prefix here
  return axios.get('http://localhost:8080/api/events', {
    headers: {
      Authorization: `Bearer ${token}` // Only one space after Bearer
    }
  });
};