package com.vedant.aisuite.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedant.aisuite.dto.StudyRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudyService {

    private final AIService AIService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // In-memory store (replace with PostgreSQL repository later)
    private final List<Map<String, Object>> savedNotes = new ArrayList<>();

    public StudyService(AIService AIService) {
        this.AIService = AIService;
    }

    /**
     * Calls OpenAI to summarize the provided text.
     * Returns a structured map with summary, keyPoints, keyConcepts.
     */
    public Map<String, Object> summarize(StudyRequest request) {
        try {
            String rawResponse = AIService.generateSummary(request.getText());
            @SuppressWarnings("unchecked")
            Map<String, Object> parsed = objectMapper.readValue(rawResponse, Map.class);
            parsed.put("originalLength", request.getText().length());
            parsed.put("wordCount", request.getText().split("\\s+").length);
            return parsed;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response: " + e.getMessage(), e);
        }
    }

    /**
     * Saves a note (study result) to the in-memory store.
     */
    public Map<String, Object> saveNote(StudyRequest request, Map<String, Object> summary) {
        Map<String, Object> note = new HashMap<>();
        note.put("id", UUID.randomUUID().toString());
        note.put("title", request.getTitle() != null ? request.getTitle() : "Untitled Note");
        note.put("content", request.getText());
        note.put("summary", summary.get("summary"));
        note.put("keyPoints", summary.get("keyPoints"));
        note.put("createdAt", new Date().toString());
        savedNotes.add(note);
        return note;
    }

    /**
     * Returns all saved notes in reverse chronological order.
     */
    public List<Map<String, Object>> getHistory() {
        List<Map<String, Object>> result = new ArrayList<>(savedNotes);
        Collections.reverse(result);
        return result;
    }
}