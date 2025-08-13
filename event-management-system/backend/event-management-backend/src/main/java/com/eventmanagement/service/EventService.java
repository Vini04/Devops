package com.eventmanagement.service;

import java.util.List;

import com.eventmanagement.entity.Event;

// EventService interface defines the business logic for managing events.
public interface EventService {
	
	// Fetches all events from the database.
	List<Event> getAllEvents();
	
	// Creates a new event in the database.
    // @param event the Event object to be created.
    // @return the created Event object.
	Event createEvent(Event event);
	
//Other CURD Operations
	
	// Retrieves a specific event by its ID.
	// @param id the ID of the event to retrieve.
    // @return the Event object if found.
	Event getEventById(Long id);
	
	// Updates an existing event with new details.
    // @param id the ID of the event to update.
    // @param event the updated Event object.
    // @return the updated Event object.
	Event updateEvent(Long id, Event event);
	
	// Deletes an event from the database.
    // @param id the ID of the event to delete.
	void deleteEvent(Long id);
}
