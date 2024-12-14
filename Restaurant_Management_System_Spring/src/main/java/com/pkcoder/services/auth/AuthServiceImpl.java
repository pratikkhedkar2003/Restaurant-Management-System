package com.pkcoder.services.auth;

import com.pkcoder.dtos.SignupRequest;
import com.pkcoder.dtos.UserDto;
import com.pkcoder.entities.User;
import com.pkcoder.enums.UserRole;
import com.pkcoder.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    private void createAdminAccount() {
        Optional<User> optionalUser = userRepository.findByUserRole(UserRole.ADMIN);
        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setPassword(passwordEncoder.encode("admin"));
            user.setUserRole(UserRole.ADMIN);

            userRepository.save(user);
        }
    }

    @Override
    public UserDto createUser(SignupRequest signupRequest) {

        Optional<User> optionalUser = userRepository.findFirstByEmail(signupRequest.getEmail());

        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setName(signupRequest.getName());
            user.setEmail(signupRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            user.setUserRole(UserRole.CUSTOMER);

            User createdUser = userRepository.save(user);
            UserDto userDto = new UserDto();
            userDto.setId(createdUser.getId());

            return userDto;
        }

        return null;
    }
}
