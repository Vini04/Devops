// EventList.jsx: Manages fetching and displaying events (after login)
// a page — handles fetching data, state, effects, and renders UI by using components like EventList.
// fetches event data and passes it to the UI component
// EventListPage acts as the container
//  page-level file fetches data and passes it to the component-level file to render
// import logo from './logo.svg';
// import './App.css';
// import { mockEvents } from './services/mockData'; // static data import
// fetches event data and passes it to the UI component
import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList'; // Presentational component
import EventDetails from '../components/EventDetails';
import { fetchEvents } from '../services/apiService';
import LogoutButton from '../components/LogoutButton';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import axios from "axios";
import AuthService from '../services/AuthService';

const EventListPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState(""); // RSVP filter

  // Fetch events (all or filtered)
  useEffect(() => {
    const getEvents = async () => {
      try {
        let response;
        if (filter) {
          // 🔹 Fetch only events with selected RSVP status
          response = await axios.get(
            `http://localhost:8080/api/rsvps/my-rsvps/${filter}`,
            { headers: { Authorization: `Bearer ${AuthService.getToken()}` } }
          );
        } else {
          // 🔹 Fetch all events
          response = await fetchEvents();
        }

        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else if (Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events", err);
        setEvents([]);
      }
    };

    getEvents();
  }, [filter]); // 🔹 Runs whenever filter changes (dynamic)

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Event Management System</Typography>
      <LogoutButton />

      {/* 🔹 Filter Dropdown */}
      <Box mb={2}>
        <Typography variant="subtitle1">Filter by RSVP Status:</Typography>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          sx={{ width: 200 }}
        >
          <MenuItem value="">All Events</MenuItem>
          <MenuItem value="YES">Yes</MenuItem>
          <MenuItem value="NO">No</MenuItem>
          <MenuItem value="MAYBE">Maybe</MenuItem>
        </Select>
      </Box>

      {/* Event list */}
      <EventList events={events} onSelect={setSelectedEvent} />

      {/* Event details */}
      {selectedEvent && (
        <EventDetails key={selectedEvent.id} event={selectedEvent} />
      )}
    </Box>
  );
};

export default EventListPage;


// This file is responsible for managing the event list page, fetching events from the backend, and displaying them using the EventList component.
// It uses the `fetchEvents` function from the `apiService` to get the events and passes them to the `EventList` component.
// The `EventList` component is a stateless functional component that receives the list of events and a callback function to handle event selection.
// The `EventDetails` component is used to display details of the selected event.      
 