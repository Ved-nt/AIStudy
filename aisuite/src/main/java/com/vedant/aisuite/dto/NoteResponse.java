package com.vedant.aisuite.dto;

import java.time.LocalDateTime;

public class NoteResponse {

    private Long id;
    private String title;
    private String summary;
    private LocalDateTime createdAt;

    public NoteResponse(
            Long id,
            String title,
            String summary,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSummary() {
        return summary;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}