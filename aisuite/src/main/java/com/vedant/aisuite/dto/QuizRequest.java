package com.vedant.aisuite.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class QuizRequest {

    @NotBlank(message = "Topic cannot be empty")
    private String topic;

    private String difficulty = "MEDIUM"; // EASY | MEDIUM | HARD

    @Min(value = 3, message = "Minimum 3 questions")
    @Max(value = 15, message = "Maximum 15 questions")
    private int numberOfQuestions = 5;

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getNumberOfQuestions() { return numberOfQuestions; }
    public void setNumberOfQuestions(int numberOfQuestions) { this.numberOfQuestions = numberOfQuestions; }
}