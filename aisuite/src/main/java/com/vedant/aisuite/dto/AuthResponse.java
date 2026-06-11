package com.vedant.aisuite.dto;

public class AuthResponse {

    private String name;
    private String email;

    public AuthResponse(
            String name,
            String email
    ) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}