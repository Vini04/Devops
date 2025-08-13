// To declare business logic methods.
package com.employeemanagement.service;

import java.util.List;

import com.employeemanagement.entity.Employee;

public interface EmployeeService {
	List<Employee> getAllEmployees();
	Employee saveEmployee(Employee employee); // optional for POST
	Employee getEmployeeById(Long id);
	Employee createEmployee(Employee employee);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);
    // This method returns void because it performs a delete operation that does not return any data,
    // it simply removes the employee from the database. There's no object to return after deletion, so void is appropriate.
}
