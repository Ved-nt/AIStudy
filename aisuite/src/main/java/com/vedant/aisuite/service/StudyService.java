package com.vedant.aisuite.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedant.aisuite.dto.StudyRequest;
import com.vedant.aisuite.entity.Note;
import com.vedant.aisuite.repository.NoteRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.vedant.aisuite.entity.User;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudyService {

    private final AIService AIService;
    private final NoteRepository noteRepository;
    private final ObjectMapper objectMapper;

    public StudyService(
            AIService AIService,
            NoteRepository noteRepository,
            ObjectMapper objectMapper
    ) {
        this.AIService = AIService;
        this.noteRepository = noteRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * Calls AI service to summarize notes.
     */
    public Map<String, Object> summarize(StudyRequest request) {

        try {

            String rawResponse =
                    AIService.generateSummary(request.getText());

            @SuppressWarnings("unchecked")
            Map<String, Object> parsed =
                    objectMapper.readValue(rawResponse, Map.class);

            parsed.put(
                    "originalLength",
                    request.getText().length()
            );

            parsed.put(
                    "wordCount",
                    request.getText().split("\\s+").length
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

    /**
     * Saves note into PostgreSQL database.
     */
    public Note saveNote(
            StudyRequest request,
            Map<String, Object> summary
    ) {

        Note note = new Note();

        note.setTitle(
                request.getTitle() != null &&
                        !request.getTitle().isBlank()
                        ? request.getTitle()
                        : "Untitled Note"
        );

        note.setOriginalText(
                request.getText()
        );

        note.setSummary(
                summary.get("summary").toString()
        );

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) auth.getPrincipal();

        note.setUser(user);

        return noteRepository.save(note);
    }

    /**
     * Fetch all saved notes from PostgreSQL.
     */
    /**
     * Fetch logged-in user's notes only
     */
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
}