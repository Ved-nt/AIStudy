package com.vedant.aisuite.service;

import com.vedant.aisuite.dto.ChatRequest;
import com.vedant.aisuite.dto.ConversationResponse;
import com.vedant.aisuite.dto.CreateConversationResponse;
import com.vedant.aisuite.entity.ChatConversation;
import com.vedant.aisuite.entity.ChatMessage;
import com.vedant.aisuite.entity.User;
import com.vedant.aisuite.repository.ChatConversationRepository;
import com.vedant.aisuite.repository.ChatRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final AIService aiService;

    private final ChatRepository chatRepository;

    private final ChatConversationRepository
            conversationRepository;

    public ChatService(
            AIService aiService,
            ChatRepository chatRepository,
            ChatConversationRepository conversationRepository
    ) {

        this.aiService = aiService;
        this.chatRepository = chatRepository;
        this.conversationRepository =
                conversationRepository;
    }

    private User getCurrentUser() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return (User) auth.getPrincipal();
    }

    /*
     * Create New Chat
     */
    public CreateConversationResponse
    createConversation() {

        User user =
                getCurrentUser();

        ChatConversation conversation =
                new ChatConversation();

        conversation.setTitle(
                "New Chat"
        );

        conversation.setUser(
                user
        );

        conversation =
                conversationRepository
                        .save(conversation);

        return new CreateConversationResponse(
                conversation.getId(),
                conversation.getTitle()
        );
    }

    /*
     * Sidebar Chats
     */
    public List<ConversationResponse>
    getConversations() {

        User user =
                getCurrentUser();

        return conversationRepository
                .findByUserOrderByCreatedAtDesc(
                        user
                )
                .stream()
                .map(c ->
                        new ConversationResponse(
                                c.getId(),
                                c.getTitle(),
                                c.getCreatedAt()
                        )
                )
                .toList();
    }

    /*
     * Open Chat
     */
    public List<ChatMessage>
    getConversationMessages(
            Long conversationId
    ) {

        return chatRepository
                .findByConversationIdOrderByCreatedAtAsc(
                        conversationId
                );
    }

    /*
     * Send Message
     */
    public ChatMessage ask(
            Long conversationId,
            ChatRequest request
    ) {

        User user =
                getCurrentUser();

        ChatConversation conversation =
                conversationRepository
                        .findById(
                                conversationId
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Conversation not found"
                                        )
                        );

        String answer =
                aiService.askTutor(
                        request.getMessage()
                );

        /*
         * Auto-title first message
         */
        if (
                "New Chat".equals(
                        conversation.getTitle()
                )
        ) {

            String title =
                    request.getMessage();

            if (
                    title.length() > 40
            ) {

                title =
                        title.substring(
                                0,
                                40
                        );
            }

            conversation.setTitle(
                    title
            );

            conversationRepository
                    .save(
                            conversation
                    );
        }

        ChatMessage chat =
                new ChatMessage();

        chat.setUser(
                user
        );

        chat.setConversation(
                conversation
        );

        chat.setUserMessage(
                request.getMessage()
        );

        chat.setAiResponse(
                answer
        );

        return chatRepository.save(
                chat
        );
    }
}