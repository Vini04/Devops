package com.eventmanagement.service.impl;

import com.eventmanagement.entity.Role;
import com.eventmanagement.entity.User;
import com.eventmanagement.repository.RoleRepository;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.service.UserService;
import com.eventmanagement.payload.SignupRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String registerUser(SignupRequest signUpRequest) {
        // Create a new User object to hold signup data
        User user = new User();
        
        // Set basic user details from the signup request
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());

        // Encode the raw password before saving to the database (for security)
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        // Get the roles provided in the request (if any)
        Set<String> strRoles = signUpRequest.getRoles(); // These are role names like "ROLE_ADMIN", "ROLE_ATTENDEE"
        Set<Role> roles = new HashSet<>(); // This will hold actual Role entity objects

        // If no roles provided, assign default role "ROLE_ATTENDEE"
        if (strRoles == null || strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName("ROLE_ATTENDEE")
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
            roles.add(userRole);
        } else {
            // If roles are provided, loop through each and fetch the Role entity from DB
            for (String roleName : strRoles) {
                Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Error: Role not found."));
                roles.add(role);
            }
        }

        // Assign the fetched Role entities to the user
        user.setRoles(roles);

        // Save the user to the database
        userRepository.save(user);

        // Return success message
        return "User registered successfully!";
    }

}
