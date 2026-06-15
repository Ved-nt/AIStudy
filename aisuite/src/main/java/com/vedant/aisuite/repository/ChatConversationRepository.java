package com.vedant.aisuite.repository;

import com.vedant.aisuite.entity.ChatConversation;
import com.vedant.aisuite.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface
ChatConversationRepository
        extends JpaRepository
        <ChatConversation, Long> {

    List<ChatConversation>
    findByUserOrderByCreatedAtDesc(
            User user
    );
}