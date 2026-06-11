package com.vedant.aisuite.security;

import com.vedant.aisuite.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.
        UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.
        SecurityContextHolder;

import org.springframework.security.core.userdetails.
        UserDetails;

import org.springframework.security.web.authentication.
        WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final CustomerUserDetailsService
            userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomerUserDetailsService userDetailsService
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String jwt = null;

        Cookie[] cookies =
                request.getCookies();

        if (cookies != null) {

            for (Cookie cookie : cookies) {

                if ("jwt".equals(cookie.getName())) {

                    jwt = cookie.getValue();

                    break;
                }
            }
        }

        if (jwt == null) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        String email;

        try {

            email =
                    jwtService.extractUsername(jwt);

        } catch (Exception e) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        if (
                email != null
                        &&
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                == null
        ) {

            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(
                                    email
                            );

            if (
                    jwtService.isTokenValid(
                            jwt,
                            userDetails
                    )
            ) {

                UsernamePasswordAuthenticationToken
                        authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails
                                        .getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(
                                        request
                                )
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(
                                authToken
                        );
            }
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}