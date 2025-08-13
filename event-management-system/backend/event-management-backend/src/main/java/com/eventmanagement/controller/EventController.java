package com.eventmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmanagement.entity.Event;
import com.eventmanagement.service.EventService;

// Controller for handling HTTP requests related to events.
// Suffice for basic functionality (retrieving and creating events).
@RestController
@RequestMapping("/api/events")
@PreAuthorize("hasRole('ADMIN')") // This ensures only users with ROLE_ADMIN can create events.
// restrict access to specific roles like "ROLE_ADMIN" or "ROLE_ATTENDEE"
public class EventController {
	
	// Service layer dependency to handle business logic
	private final EventService eventService;
	
    // Constructor-based dependency injection for EventService.
    // This ensures the final field is initialized properly.
	@Autowired
	public EventController(EventService eventService) {
		this.eventService = eventService;
	}
	
	@GetMapping
	@PreAuthorize("hasAnyRole('ADMIN', 'ATTENDEE')") // Allow both roles to view events
	public List<Event> getAllEvents() {
		return eventService.getAllEvents();
	}
	
	@PostMapping
	 @PreAuthorize("hasRole('ADMIN')") // Only admins can create events
	public Event createEvent(@RequestBody Event event) {
		return eventService.createEvent(event);
	}
}
