package com.vedant.aisuite.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_history")
public class QuizHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;

    private String difficulty;

    private Integer score;

    private Integer totalQuestions;

    private Double percentage;

    private LocalDateTime createdAt = LocalDateTime.now();

    public QuizHistory() {
    }

    public QuizHistory(
            String topic,
            String difficulty,
            Integer score,
            Integer totalQuestions,
            Double percentage
    ) {
        this.topic = topic;
        this.difficulty = difficulty;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
    }

    public Long getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public Integer getScore() {
        return score;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public Double getPercentage() {
        return percentage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}