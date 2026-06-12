package com.vedant.aisuite.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedant.aisuite.dto.StudyRequest;
import com.vedant.aisuite.entity.Note;
import com.vedant.aisuite.entity.User;
import com.vedant.aisuite.repository.NoteRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudyService {

    private final AIService aiService;

    private final NoteRepository noteRepository;

    private final ObjectMapper objectMapper;

    public StudyService(
            AIService aiService,
            NoteRepository noteRepository,
            ObjectMapper objectMapper
    ) {
        this.aiService = aiService;
        this.noteRepository = noteRepository;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> summarize(
            StudyRequest request
    ) {

        try {

            String rawResponse =
                    aiService.generateSummary(
                            request.getText()
                    );

            @SuppressWarnings("unchecked")
            Map<String, Object> parsed =
                    objectMapper.readValue(
                            rawResponse,
                            Map.class
                    );

            parsed.put(
                    "originalLength",
                    request.getText().length()
            );

            parsed.put(
                    "wordCount",
                    request.getText()
                            .split("\\s+")
                            .length
            );

            return parsed;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse AI response: "
                            + e.getMessage(),
                    e
            );
        }
    }

    public Note saveNote(
            StudyRequest request,
            Map<String, Object> summary
    ) {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) auth.getPrincipal();

        Note note = new Note();

        note.setTitle(
                request.getTitle() != null
                        && !request.getTitle().isBlank()
                        ? request.getTitle()
                        : "Untitled Note"
        );

        note.setOriginalText(
                request.getText()
        );

        note.setSummary(
                summary.get("summary")
                        .toString()
        );

        note.setUser(user);

        return noteRepository.save(note);
    }

    public List<Note> getHistory() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) auth.getPrincipal();

        List<Note> notes =
                noteRepository.findByUser(user);

        Collections.reverse(notes);

        return notes;
    }

    /*
     * STUDY STATS
     */
    public Map<String, Object> getStats() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) auth.getPrincipal();

        List<Note> notes =
                noteRepository.findByUser(user);

        long totalSummaries =
                notes.size();

        int totalWordsProcessed =
                notes.stream()
                        .mapToInt(note ->
                                note.getOriginalText() != null
                                        ? note.getOriginalText()
                                        .split("\\s+")
                                        .length
                                        : 0
                        )
                        .sum();

        int totalSummaryWords =
                notes.stream()
                        .mapToInt(note ->
                                note.getSummary() != null
                                        ? note.getSummary()
                                        .split("\\s+")
                                        .length
                                        : 0
                        )
                        .sum();

        double averageCompression = 0;

        if (totalWordsProcessed > 0) {

            averageCompression =
                    (
                            (double)
                                    totalSummaryWords
                                    /
                                    totalWordsProcessed
                    ) * 100;
        }

        List<Note> recentNotes =
                noteRepository
                        .findTop5ByUserOrderByCreatedAtDesc(
                                user
                        );

        Map<String, Object> stats =
                new HashMap<>();

        stats.put(
                "totalSummaries",
                totalSummaries
        );

        stats.put(
                "totalWordsProcessed",
                totalWordsProcessed
        );

        stats.put(
                "averageCompressionPercentage",
                Math.round(
                        averageCompression
                )
        );

        stats.put(
                "recentNotes",
                recentNotes
        );

        return stats;
    }
}