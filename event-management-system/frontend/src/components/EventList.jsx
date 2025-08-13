// To display all events
// Component receives a list of events (props) and displays them:
// reusable UI component — small and stateless.
// only handles UI display
import React from 'react';

const EventList = ({ events, onSelect }) => (
    // This component receives events and a callback to handle selection
  <div>
    <h2>All Events</h2>
    <ul>
      {events.map(event => (
        // Each event is displayed as a list item
        // When clicked, it calls onSelect with the event data
        <li
          key={event.id}
          onClick={() => onSelect(event)}
          style={{ cursor: 'pointer', marginBottom: '8px' }}
        >
          <strong>{event.title}</strong> - {event.date} at {event.venue}
        </li>
      ))}
    </ul>
  </div>
);

export default EventList;