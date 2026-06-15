package com.vedant.aisuite.dto;

public class CreateConversationResponse {

    private Long id;

    private String title;

    public CreateConversationResponse(
            Long id,
            String title
    ) {
        this.id = id;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
}