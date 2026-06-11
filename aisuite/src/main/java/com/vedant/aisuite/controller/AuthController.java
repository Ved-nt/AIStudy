package com.vedant.aisuite.controller;

import com.vedant.aisuite.dto.LoginRequest;
import com.vedant.aisuite.dto.RegisterRequest;
import com.vedant.aisuite.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request,
            HttpServletResponse response
    ) {

        Map<String, Object> result =
                authService.register(request);

        Cookie cookie =
                new Cookie(
                        "jwt",
                        (String) result.get("token")
                );

        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true in production (HTTPS)
        cookie.setPath("/");

        cookie.setMaxAge(
                request.isRememberMe()
                        ? 604800
                        : 120
        );

        response.addCookie(cookie);

        return ResponseEntity.ok(
                Map.of(
                        "name",
                        result.get("name"),
                        "email",
                        result.get("email")
                )
        );
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(
            org.springframework.security.core.Authentication authentication
    ) {

        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(
                Map.of(
                        "email", authentication.getName()
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {

        Map<String, Object> result =
                authService.login(request);

        Cookie cookie =
                new Cookie(
                        "jwt",
                        (String) result.get("token")
                );

        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true in production
        cookie.setPath("/");

        cookie.setMaxAge(
                request.isRememberMe()
                        ? 604800
                        : 120
        );

        response.addCookie(cookie);

        return ResponseEntity.ok(
                Map.of(
                        "name",
                        result.get("name"),
                        "email",
                        result.get("email")
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletResponse response
    ) {

        Cookie cookie =
                new Cookie(
                        "jwt",
                        ""
                );

        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Logged out successfully"
                )
        );
    }
}