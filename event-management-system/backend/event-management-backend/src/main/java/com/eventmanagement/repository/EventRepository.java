package com.eventmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmanagement.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
	// Additional query methods (if needed) can be declared here
}
