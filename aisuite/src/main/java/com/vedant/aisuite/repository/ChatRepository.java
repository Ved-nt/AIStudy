package com.vedant.aisuite.repository;

import com.vedant.aisuite.entity.ChatMessage;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository
        extends JpaRepository
        <ChatMessage, Long> {

    List<ChatMessage>
    findByConversationIdOrderByCreatedAtAsc(
            Long conversationId
    );
}