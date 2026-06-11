package com.vedant.aisuite.service;

import com.vedant.aisuite.dto.LoginRequest;
import com.vedant.aisuite.dto.RegisterRequest;
import com.vedant.aisuite.entity.User;
import com.vedant.aisuite.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public Map<String, Object> register(
            RegisterRequest request
    ) {

        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {
            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        userRepository.save(user);

        String token =
                jwtService.generateToken(
                        user.getEmail(),
                        request.isRememberMe()
                );

        return Map.of(
                "token", token,
                "name", user.getName(),
                "email", user.getEmail()
        );
    }

    public Map<String, Object> login(
            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Invalid email or password"
                                        )
                        );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        String token =
                jwtService.generateToken(
                        user.getEmail(),
                        request.isRememberMe()
                );

        return Map.of(
                "token", token,
                "name", user.getName(),
                "email", user.getEmail()
        );
    }
}