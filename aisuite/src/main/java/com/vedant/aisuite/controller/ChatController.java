package com.vedant.aisuite.controller;

import com.vedant.aisuite.dto.ChatRequest;
import com.vedant.aisuite.service.ChatService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class ChatController {

    private final ChatService chatService;

    public ChatController(
            ChatService chatService
    ) {
        this.chatService = chatService;
    }

    /*
     * Create New Conversation
     */
    @PostMapping("/conversations")
    public ResponseEntity<?> createConversation() {

        return ResponseEntity.ok(
                chatService.createConversation()
        );
    }

    /*
     * Get Sidebar Conversations
     */
    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations() {

        return ResponseEntity.ok(
                chatService.getConversations()
        );
    }

    /*
     * Open Conversation
     */
    @GetMapping(
            "/conversations/{conversationId}"
    )
    public ResponseEntity<?> getMessages(
            @PathVariable
            Long conversationId
    ) {

        return ResponseEntity.ok(
                chatService.getConversationMessages(
                        conversationId
                )
        );
    }

    /*
     * Send Message
     */
    @PostMapping(
            "/conversations/{conversationId}/ask"
    )
    public ResponseEntity<?> ask(
            @PathVariable
            Long conversationId,

            @Valid
            @RequestBody
            ChatRequest request
    ) {

        return ResponseEntity.ok(
                chatService.ask(
                        conversationId,
                        request
                )
        );
    }
}