// To build form using state, and call AuthService.
// Username & Password input fields
// Submit button
// Calls AuthService.login
// Stores token on success
// Displays error on failure
// Using Material UI (MUI)

// Components connect to your backend /api/auth/signin and /api/auth/signup APIs and store JWT tokens in localStorage.

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // to navigate after login
import axios from 'axios';
import AuthService from '../services/AuthService';  // custom service to call backend login API
const API_BASE = 'http://localhost:8080/api/auth'; // Base URL for authentication APIs

const Login = ({ setIsLoggedIn }) => { // Accept setIsLoggedIn as a prop
  const [credentials, setCredentials] = useState({ username: '', password: '' }); // state for login form
  const [error, setError] = useState('');
  const navigate = useNavigate(); // hook to redirect user
  const { username, password } = credentials; // destructure for easier access
  // Handle input change for both fields
  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [events, setEvents] = useState([]);

  // Handle form submission
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/signin`, { username, password });

      // response.data is "Bearer <token>"
      let token = response.data;
      if (token && token.startsWith("Bearer ")) {
        token = token.substring(7); // Remove "Bearer " prefix
        AuthService.saveToken(token);
        setIsLoggedIn(true);
        navigate("/events");
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
};

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>

        {/* Show error if login fails */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Form starts here */}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;