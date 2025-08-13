package com.employeemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employeemanagement.entity.Employee;

// Provides methods to interact with the database (e.g., findAll()).
public interface EmployeeRepository extends JpaRepository<Employee, Long>{ // Employee entity reference
	// Additional query methods (if needed) can be declared here

}
