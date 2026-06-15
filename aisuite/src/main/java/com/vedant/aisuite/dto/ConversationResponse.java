package com.vedant.aisuite.dto;

import java.time.LocalDateTime;

public class ConversationResponse {

    private Long id;

    private String title;

    private LocalDateTime createdAt;

    public ConversationResponse(
            Long id,
            String title,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}