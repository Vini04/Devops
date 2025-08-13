//  to display more info when an event is clicked
// To show the selected event in detail

// EventDetails.jsx

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import AuthService from '../services/AuthService';

const EventDetails = ({ event }) => {
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [rsvpSummary, setRSVPSummary] = useState(null);
  const { user } = useContext(AuthContext);
  const token = AuthService.getToken();

  useEffect(() => {
    console.log("EventDetails mounted with event:", event);
  }, []);

  // Fetch existing RSVP for attendee
  useEffect(() => {
    if (!event || !user || user.role !== "ROLE_ATTENDEE") return;

    const fetchExistingRsvp = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/rsvps/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userRsvp = response.data.find(r => r.event?.id === event.id);
        if (userRsvp) {
          setSelectedOption(userRsvp.status);
          setRsvpStatus(userRsvp.status);
        }
      } catch (err) {
        console.error("Error fetching RSVP", err);
      }
    };

    fetchExistingRsvp();
  }, [event?.id, user?.role]);

  
  // Fetch RSVP summary for admin
  useEffect(() => {
    console.log("User context:", user);
    if (!event || !event.id || !user || user.role !== "ROLE_ADMIN") return;

    const fetchRsvpSummary = async () => {
      try {
        console.log("Fetching summary for event ID:", event.id);
        const response = await axios.get(
          `http://localhost:8080/api/rsvps/summary/${event.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("RSVP Summary Response:", response.data);
        setRSVPSummary(response.data);
      } catch (error) {
        console.error("Error fetching RSVP summary:", error.response?.data || error.message);
      }
    };

    fetchRsvpSummary();
  }, [event?.id, user?.role]);

  if (!event) return null;

  const handleRsvp = async () => {
    if (!rsvpStatus) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/rsvps`,
        {
          eventId: event.id,
          status: rsvpStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      setMessage(response.data.message);
      alert("RSVP submitted successfully!");
    } catch (error) {
      console.error("Error submitting RSVP:", error.response?.data || error.message);
      setMessage('Failed to RSVP. Please try again later.');
    }
  };

  return (
    <Box mt={4} p={2} border={1} borderColor="grey.300" borderRadius={2}>
      <Typography variant="h6">Event Details</Typography>
      <Typography><strong>Title:</strong> {event.title}</Typography>
      <Typography><strong>Description:</strong> {event.description}</Typography>
      <Typography><strong>Date:</strong> {event.date}</Typography>
      <Typography><strong>Venue:</strong> {event.venue}</Typography>

      {/* RSVP Summary for Admin */}
      {user?.role === "ROLE_ADMIN" && (
        rsvpSummary ? (
          <Box mt={2}>
            <Typography variant="subtitle1">RSVP Summary</Typography>
            <Typography>✅ Yes: {rsvpSummary.yes}</Typography>
            <Typography>❌ No: {rsvpSummary.no}</Typography>
            <Typography>🤔 Maybe: {rsvpSummary.maybe}</Typography>
          </Box>
        ) : (
          <Typography mt={2}>Loading summary or no data available.</Typography>
        )
      )}

      {/*  RSVP Options for Attendee */}
      {user?.role === "ROLE_ATTENDEE" && (
        <>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Your Response:</Typography>
            <RadioGroup
              value={rsvpStatus}
              onChange={(e) => setRsvpStatus(e.target.value)}
              row
            >
              <FormControlLabel value="YES" control={<Radio />} label="Yes" />
              <FormControlLabel value="NO" control={<Radio />} label="No" />
              <FormControlLabel value="MAYBE" control={<Radio />} label="Maybe" />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleRsvp}
            disabled={!rsvpStatus}
            sx={{ mt: 2 }}
          >
            Submit Response
          </Button>

          {message && (
            <Typography sx={{ mt: 2, color: 'green' }}>{message}</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default EventDetails;



// if (!event) return null: Prevents the component from rendering if no event is selected.
// rsvpStatus is stored in state and updated when user selects an option.
// handleRSVP() function posts RSVP data to the backend along with JWT in header.
// Error/success messages are shown to the user after attempting RSVP.


