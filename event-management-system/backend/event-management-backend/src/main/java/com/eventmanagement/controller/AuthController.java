package com.eventmanagement.controller;

import com.eventmanagement.payload.LoginRequest;
import com.eventmanagement.payload.SignupRequest;
import com.eventmanagement.security.JwtUtils;
import com.eventmanagement.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend requests
public class AuthController {
	
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	
	@Autowired
	public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
	    this.authenticationManager = authenticationManager;
	    this.jwtUtils = jwtUtils;
	    this.userService = userService;
	}
	
	// POST endpoint to register a new user
	@PostMapping("/signup")
	// To handle HTTP POST requests to "/api/auth/signup"
	public ResponseEntity<String> registerUser(@RequestBody SignupRequest signupRequest) {
		// Call the service layer to handle user registration logic      
		String result = userService.registerUser(signupRequest);
		// Return the result (e.g., success or error message) in the HTTP response with status 200 OK
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
	    // Authenticate using Spring Security
	    Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(
	                    loginRequest.getUsername(),
	                    loginRequest.getPassword()
	            )
	    );

	    // Set the authentication context
	    SecurityContextHolder.getContext().setAuthentication(authentication);

	    // Extract role from authenticated user
	    String role = authentication.getAuthorities().iterator().next().getAuthority(); // e.g., "ADMIN"

	    // Generate JWT with role
	    String jwt = jwtUtils.generateToken(loginRequest.getUsername(), role);

	    // Return JWT token in response
	    return ResponseEntity.ok("Bearer " + jwt);
	}

	
//@RequestBody maps incoming JSON to the SignupRequest object.
// userService.registerUser(...) processes and saves the new user.
// ResponseEntity.ok(...) returns a 200 OK response with a message (e.g., "User registered successfully!").
}
