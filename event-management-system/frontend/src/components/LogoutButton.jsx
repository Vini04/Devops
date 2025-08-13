import React, { use, useContext } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LogoutButton = ({ setIsLoggedIn }) => { // Accept setIsLoggedIn as a prop to update login state
    const navigate = useNavigate(); // useNavigate hook to programmatically navigate

    const handleLogout = () => {
        AuthService.logout(); // Clear token from local storage
        if (setIsLoggedIn) setIsLoggedIn(false); // Update login state
        navigate("/login"); // Redirect to login page
    };

    return (
        <Button variant="outlined" onClick={handleLogout} color="error">
            Logout
        </Button>
    );
};

export default LogoutButton;

// Not to use useContext as : the error is because you are using useContext(AuthService) in your LogoutButton.jsx, but AuthService is not a React context—it's just an object with functions.