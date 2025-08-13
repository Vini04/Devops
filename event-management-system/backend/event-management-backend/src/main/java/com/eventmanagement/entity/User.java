package com.eventmanagement.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	private String password;
	private String email;
	
	
	// A user can have multiple roles (e.g., ADMIN, ATTENDEE) and each role can be assigned to multiple users.
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable( // To define a join table named "user_roles" to manage the many-to-many relationship
			name = "user_roles", 
			joinColumns = @JoinColumn(name = "user_id"),  // Foreign Key referencing the User entity
			inverseJoinColumns = @JoinColumn(name = "role_id") // // Foreign Key referencing the Role entity
			)
	private Set<Role> roles = new HashSet<>(); // To ensure the user can have multiple roles, with no duplicates (since Set doesn't allow duplicates).

	//Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
}
