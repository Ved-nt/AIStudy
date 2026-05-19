package com.vedant.aisuite.controller;

import com.vedant.aisuite.dto.StudyRequest;
import com.vedant.aisuite.entity.Note;
import com.vedant.aisuite.service.StudyService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/study")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyController {

    private final StudyService studyService;

    public StudyController(StudyService studyService) {
        this.studyService = studyService;
    }

    /**
     * POST /api/study/summarize
     * Body:
     * {
     *   "text": "your notes",
     *   "title": "optional"
     * }
     */
    @PostMapping("/summarize")
    public ResponseEntity<?> summarize(
            @Valid @RequestBody StudyRequest request
    ) {

        try {

            Map<String, Object> result =
                    studyService.summarize(request);

            return ResponseEntity.ok(result);

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "error",
                            e.getMessage()
                    ));
        }
    }

    /**
     * POST /api/study/save
     * Saves note in PostgreSQL
     */
    @PostMapping("/save")
    public ResponseEntity<?> save(
            @Valid @RequestBody StudyRequest request
    ) {

        try {

            Map<String, Object> summary =
                    studyService.summarize(request);

            Note savedNote =
                    studyService.saveNote(request, summary);

            return ResponseEntity.ok(savedNote);

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "error",
                            e.getMessage()
                    ));
        }
    }

    /**
     * GET /api/study/history
     * Fetch all notes from PostgreSQL
     */
    @GetMapping("/history")
    public ResponseEntity<List<Note>> history() {

        return ResponseEntity.ok(
                studyService.getHistory()
        );
    }

    /**
     * Health Check
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {

        return ResponseEntity.ok(
                Map.of(
                        "status", "OK",
                        "module", "Study Buddy",
                        "message", "Study controller is running"
                )
        );
    }
}