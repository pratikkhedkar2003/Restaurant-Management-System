package com.pkcoder.services.auth;

import com.pkcoder.dtos.SignupRequest;
import com.pkcoder.dtos.UserDto;

public interface AuthService {
    UserDto createUser(SignupRequest signupRequest);
}
