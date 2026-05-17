package com.vedant.aisuite.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String chat(String systemPrompt, String userMessage) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        List<Map<String, String>> messages = new ArrayList<>();

        messages.add(Map.of(
                "role", "system",
                "content", systemPrompt
        ));

        messages.add(Map.of(
                "role", "user",
                "content", userMessage
        ));

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", messages);
        body.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        try {

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            apiUrl,
                            request,
                            String.class
                    );

            JsonNode root =
                    objectMapper.readTree(response.getBody());

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {
            throw new RuntimeException(
                    "Groq API call failed: " + e.getMessage(),
                    e
            );
        }
    }

    public String generateSummary(String text) {

        String systemPrompt = """
                You are an expert study assistant.
                Return ONLY valid JSON.

                Format:
                {
                  "summary": "2-3 sentence summary",
                  "keyPoints": ["Point 1", "Point 2"],
                  "keyConcepts": ["Concept 1", "Concept 2"]
                }
                """;

        return chat(
                systemPrompt,
                "Summarize this text:\n\n" + text
        );
    }

    public String generateQuiz(
            String topic,
            String difficulty,
            int numberOfQuestions
    ) {

        String systemPrompt = """
                You are an expert quiz creator.
                Return ONLY valid JSON array.

                Format:
                [
                  {
                    "question": "Question?",
                    "options": [
                      "A) Option",
                      "B) Option",
                      "C) Option",
                      "D) Option"
                    ],
                    "correctAnswer": "A) Option",
                    "explanation": "Explanation"
                  }
                ]
                """;

        String userMessage = String.format(
                "Generate %d %s MCQ questions on topic: %s",
                numberOfQuestions,
                difficulty,
                topic
        );

        return chat(systemPrompt, userMessage);
    }
}