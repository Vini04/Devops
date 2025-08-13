// DTO—Data Transfer Object
package com.eventmanagement.payload;

import com.eventmanagement.entity.RSVPStatus;

public class RSVPRequest {
	private Long eventId;
	private RSVPStatus Status;
	
	//Getters and Setters
	public Long getEventId() {
		return eventId;
	}
	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}
	public RSVPStatus getStatus() {
		return Status;
	}
	public void setStatus(RSVPStatus status) {
		Status = status;
	}
}
