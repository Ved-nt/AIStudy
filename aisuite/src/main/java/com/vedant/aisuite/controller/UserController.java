package com.vedant.aisuite.controller;

import com.vedant.aisuite.dto.UserProfileResponse;
import com.vedant.aisuite.entity.User;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getProfile(
            Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        UserProfileResponse response =
                new UserProfileResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                );

        return ResponseEntity.ok(response);
    }
}