package com.eventmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmanagement.entity.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
	// Additional query methods (if needed) can be declared here
	Optional<Role> findByName(String name);
}
