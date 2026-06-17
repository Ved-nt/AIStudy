package com.vedant.aisuite.controller;

import com.vedant.aisuite.dto.LoginRequest;
import com.vedant.aisuite.dto.RegisterRequest;
import com.vedant.aisuite.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /*
     * REGISTER
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request,
            HttpServletResponse response
    ) {

        Map<String, Object> result = authService.register(request);

        ResponseCookie cookie = ResponseCookie.from("jwt", (String) result.get("token"))
                .httpOnly(true)
                .secure(true) // REQUIRED for Vercel + Render (HTTPS)
                .path("/")
                .sameSite("None") // IMPORTANT for cross-site cookies
                .maxAge(request.isRememberMe() ? 604800 : 120)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(
                Map.of(
                        "name", result.get("name"),
                        "email", result.get("email")
                )
        );
    }

    /*
     * LOGIN
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {

        Map<String, Object> result = authService.login(request);

        ResponseCookie cookie = ResponseCookie.from("jwt", (String) result.get("token"))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(request.isRememberMe() ? 604800 : 120)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(
                Map.of(
                        "name", result.get("name"),
                        "email", result.get("email")
                )
        );
    }

    /*
     * ME (AUTH CHECK)
     */
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

    /*
     * LOGOUT
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(
                Map.of(
                        "message", "Logged out successfully"
                )
        );
    }
}