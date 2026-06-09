package com.vedant.aisuite.entity;

import jakarta.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(
            unique = true,
            nullable = false
    )
    private String email;

    @Column(nullable = false)
    private String password;

    private LocalDateTime createdAt =
            LocalDateTime.now();

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Note> notes =
            new ArrayList<>();

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<QuizHistory> quizzes =
            new ArrayList<>();

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Quiz> generatedQuizzes =
            new ArrayList<>();

    public User() {
    }

    public User(
            String name,
            String email,
            String password
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // ======================
    // Getters & Setters
    // ======================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name
    ) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password
    ) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(
            List<Note> notes
    ) {
        this.notes = notes;
    }

    public List<QuizHistory> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(
            List<QuizHistory> quizzes
    ) {
        this.quizzes = quizzes;
    }

    // ======================
    // UserDetails Methods
    // ======================

    @Override
    public Collection<? extends GrantedAuthority>
    getAuthorities() {

        return List.of();
    }

    @Override
    public String getUsername() {

        return email;
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }
}