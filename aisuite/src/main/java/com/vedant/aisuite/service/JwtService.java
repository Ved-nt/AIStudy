package com.vedant.aisuite.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "thisIsASuperSecureSecretKeyForJwt2026";

    private final Key key =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(
                            StandardCharsets.UTF_8
                    )
            );

    /**
     * Generate JWT
     */
    public String generateToken(
            String email,
            boolean rememberMe
    )
    {
        long expiration =
                rememberMe
                        ? 7 * 24 * 60 * 60 * 1000L
                        : 2 * 60 * 1000L;

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expiration
                        )
                )
                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    /**
     * Extract Username (Email)
     */
    public String extractUsername(
            String token
    ) {

        return extractClaims(token)
                .getSubject();
    }

    /**
     * Keep old method for compatibility
     */
    public String extractEmail(
            String token
    ) {

        return extractUsername(token);
    }

    /**
     * Validate Token Against User
     */
    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        String email =
                extractUsername(token);

        return email.equals(
                userDetails.getUsername()
        )
                &&
                !extractClaims(token)
                        .getExpiration()
                        .before(new Date());
    }

    /**
     * Generic Validation
     *
     */
    public boolean validateToken(
            String token
    ) {

        try {

            extractClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    /**
     * Extract Claims
     */
    private Claims extractClaims(
            String token
    ) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}