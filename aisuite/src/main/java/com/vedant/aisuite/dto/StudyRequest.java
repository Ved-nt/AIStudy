package com.vedant.aisuite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class StudyRequest {

    @NotBlank(message = "Text cannot be empty")
    @Size(min = 20, max = 10000, message = "Text must be between 20 and 10000 characters")
    private String text;

    private String title;

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}