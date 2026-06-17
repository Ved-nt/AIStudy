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

public class StudyController {

    private final StudyService studyService;

    public StudyController(
            StudyService studyService
    ) {
        this.studyService = studyService;
    }

    @PostMapping("/summarize")
    public ResponseEntity<?> summarize(
            @Valid
            @RequestBody
            StudyRequest request
    ) {

        Map<String, Object> result =
                studyService.summarize(
                        request
                );

        return ResponseEntity.ok(
                result
        );
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(
            @Valid
            @RequestBody
            StudyRequest request
    ) {

        Map<String, Object> summary =
                studyService.summarize(
                        request
                );

        Note note =
                studyService.saveNote(
                        request,
                        summary
                );

        return ResponseEntity.ok(
                note
        );
    }

    @GetMapping("/history")
    public ResponseEntity<List<Note>> history() {

        return ResponseEntity.ok(
                studyService.getHistory()
        );
    }

    /*
     * STUDY DASHBOARD STATS
     */
    @GetMapping("/stats")
    public ResponseEntity<?> stats() {

        return ResponseEntity.ok(
                studyService.getStats()
        );
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {

        return ResponseEntity.ok(
                Map.of(
                        "status", "OK",
                        "module", "Study Buddy",
                        "message",
                        "Study controller is running"
                )
        );
    }
}