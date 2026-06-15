package com.vedant.aisuite.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String userMessage;

    @Column(columnDefinition = "TEXT")
    private String aiResponse;

    private LocalDateTime createdAt =
            LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id")
    @JsonIgnore
    private ChatConversation conversation;

    public Long getId() {
        return id;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public String getAiResponse() {
        return aiResponse;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public ChatConversation getConversation() {
        return conversation;
    }

    public void setUserMessage(
            String userMessage
    ) {
        this.userMessage = userMessage;
    }

    public void setAiResponse(
            String aiResponse
    ) {
        this.aiResponse = aiResponse;
    }

    public void setUser(
            User user
    ) {
        this.user = user;
    }

    public void setConversation(
            ChatConversation conversation
    ) {
        this.conversation = conversation;
    }
}