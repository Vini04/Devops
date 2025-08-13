package com.eventmanagement.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmanagement.entity.Event;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.service.EventService;

@Service // Annotation to let Spring recognize it as a service component.
public class EventServiceImpl implements EventService {
	
	private final EventRepository eventRepository;
	
	@Autowired // or constructor injection to bring in EventRepository.
    public EventServiceImpl(EventRepository eventRepository) { // To make EventServiceImpl implement the EventService interface.
        this.eventRepository = eventRepository;
    }

	// Override all declared methods from the EventService.
	// To use EventRepository methods like save(), findAll(), findById(), and deleteById() to implement functionality.
	@Override
	public List<Event> getAllEvents() {
		return eventRepository.findAll();
	}

	@Override
	public Event createEvent(Event event) {
		return eventRepository.save(event);
	}

	@Override
	public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));

	}

	@Override
	public Event updateEvent(Long id, Event event) {
        Event existingEvent = getEventById(id);
        existingEvent.setTitle(event.getTitle());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setDate(event.getDate());
        existingEvent.setVenue(event.getVenue());
        return eventRepository.save(existingEvent);
	}

	@Override
	public void deleteEvent(Long id) {
		eventRepository.deleteById(id);
		
	}

}
