package com.eventmanagement.entity;

import jakarta.annotation.Generated;
import jakarta.annotation.sql.DataSourceDefinition;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity // // Marks this class as a JPA entity (maps to a database table)
@Table(name = "rsvps")
public class RSVP {
	
	@Id // Primary Key of table
	@GeneratedValue(strategy = GenerationType.IDENTITY) // ID auto incremented
	private long id;
	
    // Who RSVPed (Attendee)
    @ManyToOne(fetch = FetchType.LAZY, optional = false) // Many RSVPs can be linked to one User (attendee)
    @JoinColumn(name = "user_id", nullable = false) // Foreign key column in rsvps table for user
    private User user;
    
    
    // optional = false : ensures JPA treats the relationship as mandatory.
    // nullable = false in @JoinColumn enforces the constraint at the database level.
    
    // Which Event they RSVPed to
    @ManyToOne(fetch = FetchType.LAZY, optional = false) // Many RSVPs can be linked to one Event
    @JoinColumn(name = "event_id", nullable = false) // Foreign key column in rsvps table for event
    private Event event;
    
    // RSVP status: Yes / No / Maybe
    @Enumerated(EnumType.STRING) // Store enum as a string in the database
    private RSVPStatus status;
    
    // No-arg constructor
    public RSVP() {}

    // All-args constructor
    public RSVP(Long id, User user, Event event, RSVPStatus status) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.status = status;
    }
    
    // Getters and Setters
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public RSVPStatus getStatus() {
		return status;
	}

	public void setStatus(RSVPStatus status) {
		this.status = status;
	} 

}
