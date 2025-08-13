// To build form using state, and call AuthService.
// Using Material UI (MUI)
// Components connect to your backend /api/auth/signin and /api/auth/signup APIs and store JWT tokens in localStorage.

import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import AuthService from '../services/AuthService'; // service to call backend signup API
import { useNavigate } from 'react-router-dom'; // hook to navigate
// import EventList from '../components/EventList';

const Register = () => {
    const [userData, setUserData] = useState({ 
        username: '', 
        email: '',
        password: '' ,
        roles: ["ROLE_ATTENDEE"] // default role assigned
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Handle form input change
    const handleChange = e => { // Event object automatically passed to the onChange handler of form elements.
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
            // e.target.name refers to the input field's name attribute (e.g., "username").
            // e.target.value is the current value typed into that field.
        });
    };
    
    // Handle form input change
    const handleRegister = async e => {
        e.preventDefault();
        setError('');
        try {
            await AuthService.register(userData); // call backend /signup API
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000); // redirect after 2 seconds
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                {/* Alert messages */}
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
                    <TextField
                        name="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;