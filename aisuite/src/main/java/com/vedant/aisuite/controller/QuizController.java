package com.vedant.aisuite.controller;

import com.vedant.aisuite.dto.QuizRequest;
import com.vedant.aisuite.dto.QuizSubmitRequest;
import com.vedant.aisuite.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    /**
     * POST /api/quiz/generate
     * Body: { "topic": "Java OOP", "difficulty": "MEDIUM", "numberOfQuestions": 5 }
     * Returns: quizId + questions (without answers)
     */
    @PostMapping("/generate")
    public ResponseEntity<?> generate(@Valid @RequestBody QuizRequest request) {
        try {
            Map<String, Object> result = quizService.generateQuiz(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * POST /api/quiz/submit/{quizId}
     * Body: { "answers": [{ "questionIndex": 0, "selectedOption": "A) Option" }] }
     * Returns: score, percentage, pass/fail, per-question results with explanations
     */
    @PostMapping("/submit/{quizId}")
    public ResponseEntity<?> submit(
            @PathVariable String quizId,
            @RequestBody QuizSubmitRequest submitRequest) {
        try {
            Map<String, Object> result = quizService.submitQuiz(quizId, submitRequest);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * GET /api/quiz/health
     * Quick health check for Postman testing
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
                "status", "OK",
                "module", "Quiz Generator",
                "message", "Quiz controller is running"
        ));
    }
}