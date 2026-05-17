package com.vedant.aisuite.controller;

import com.vedant.aisuite.dto.StudyRequest;
import com.vedant.aisuite.service.StudyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/study")
public class StudyController {

    private final StudyService studyService;

    public StudyController(StudyService studyService) {
        this.studyService = studyService;
    }

    /**
     * POST /api/study/summarize
     * Body: { "text": "your notes here", "title": "optional title" }
     * Returns: summary, keyPoints, keyConcepts, wordCount
     */
    @PostMapping("/summarize")
    public ResponseEntity<?> summarize(@Valid @RequestBody StudyRequest request) {
        try {
            Map<String, Object> result = studyService.summarize(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * POST /api/study/save
     * Body: { "text": "notes", "title": "My Notes" }
     * Returns: saved note with generated ID and timestamp
     */
    @PostMapping("/save")
    public ResponseEntity<?> save(@Valid @RequestBody StudyRequest request) {
        try {
            Map<String, Object> summary = studyService.summarize(request);
            Map<String, Object> saved = studyService.saveNote(request, summary);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * GET /api/study/history
     * Returns: list of all saved notes (newest first)
     */
    @GetMapping("/history")
    public ResponseEntity<?> history() {
        return ResponseEntity.ok(studyService.getHistory());
    }

    /**
     * GET /api/study/health
     * Quick health check for Postman testing
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
                "status", "OK",
                "module", "Study Buddy",
                "message", "Study controller is running"
        ));
    }
}