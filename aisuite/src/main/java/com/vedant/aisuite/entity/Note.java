package com.vedant.aisuite.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(
            name = "original_text",
            columnDefinition = "TEXT"
    )
    private String originalText;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private LocalDateTime createdAt =
            LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public Note() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getOriginalText() {
        return originalText;
    }

    public String getSummary() {
        return summary;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setUser(User user) {
        this.user = user;
    }
}