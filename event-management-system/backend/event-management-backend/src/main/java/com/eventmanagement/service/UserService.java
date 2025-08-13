package com.eventmanagement.service;

import com.eventmanagement.payload.SignupRequest;

public interface UserService {
	String registerUser(SignupRequest signUpRequest);
}
