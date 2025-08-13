// App.js: Only manages routes and auth flow
// To manage routing and protected navigation
// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EventListPage from "./pages/EventList"; // future page (placeholder)
import AuthService from "./services/AuthService"; // Import AuthService for authentication handling

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // prop to track login state

  useEffect(() => {
    const token = AuthService.getToken();
    console.log("Token:", token);
}, []);

  
  // Check token in localStorage on app load
  // useEffect(() => {
  //   const token = localStorage.AuthService.getToken();
  //   if (token) {
  //     // If token exists, user is logged in
  //     setIsLoggedIn(true);
  //   } else {
  //     // If no token, user is not logged in
  //     setIsLoggedIn(false);
  //   }
  // }, []);
  
  // Check if JWT token exists in localStorage to control access to protected routes
  return (
    <Router>
      <Routes>
        {/* Default route - redirect based on login */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/events" : "/login"} />} />

        {/* Public routes */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/events"
          // Protected route: Only show EventList if user is logged in, else redirect
          element={
            isLoggedIn ? <EventListPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;