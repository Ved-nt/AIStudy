package com.vedant.aisuite.entity;

import jakarta.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Note> notes =
            new ArrayList<>();

    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<QuizHistory> quizzes =
            new ArrayList<>();

    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Quiz> generatedQuizzes =
            new ArrayList<>();

    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ChatMessage> chatMessages =
            new ArrayList<>();

    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ChatConversation> conversations =
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

    public List<Quiz> getGeneratedQuizzes() {
        return generatedQuizzes;
    }

    public void setGeneratedQuizzes(
            List<Quiz> generatedQuizzes
    ) {
        this.generatedQuizzes = generatedQuizzes;
    }

    public List<ChatMessage> getChatMessages() {
        return chatMessages;
    }

    public void setChatMessages(
            List<ChatMessage> chatMessages
    ) {
        this.chatMessages = chatMessages;
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

    public List<ChatConversation>
    getConversations() {

        return conversations;
    }

    public void setConversations(
            List<ChatConversation>
                    conversations
    ) {

        this.conversations =
                conversations;
    }
}