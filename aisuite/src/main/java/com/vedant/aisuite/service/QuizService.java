package com.vedant.aisuite.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedant.aisuite.dto.QuizRequest;
import com.vedant.aisuite.dto.QuizSubmitRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuizService {

    private final AIService AIService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // In-memory quiz store (replace with DB later)
    private final Map<String, List<Map<String, Object>>> quizStore = new HashMap<>();

    public QuizService(AIService AIService) {
        this.AIService = AIService;
    }

    /**
     * Generates quiz questions via OpenAI and stores them with a session ID.
     */
    public Map<String, Object> generateQuiz(QuizRequest request) {
        try {
            String rawResponse = AIService.generateQuiz(
                    request.getTopic(),
                    request.getDifficulty(),
                    request.getNumberOfQuestions()
            );

            List<Map<String, Object>> questions = objectMapper.readValue(
                    rawResponse, new TypeReference<List<Map<String, Object>>>() {}
            );

            // Store questions for scoring later (without revealing correctAnswer to client)
            String quizId = UUID.randomUUID().toString();
            quizStore.put(quizId, questions);

            // Strip correctAnswer and explanation from client response
            List<Map<String, Object>> clientQuestions = new ArrayList<>();
            for (Map<String, Object> q : questions) {
                Map<String, Object> clientQ = new LinkedHashMap<>();
                clientQ.put("question", q.get("question"));
                clientQ.put("options", q.get("options"));
                clientQuestions.add(clientQ);
            }

            return Map.of(
                    "quizId", quizId,
                    "topic", request.getTopic(),
                    "difficulty", request.getDifficulty(),
                    "totalQuestions", questions.size(),
                    "questions", clientQuestions
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate quiz: " + e.getMessage(), e);
        }
    }

    /**
     * Scores a submitted quiz against stored correct answers.
     */
    public Map<String, Object> submitQuiz(String quizId, QuizSubmitRequest submitRequest) {
        List<Map<String, Object>> questions = quizStore.get(quizId);
        if (questions == null) {
            throw new RuntimeException("Quiz not found. It may have expired. Please generate a new quiz.");
        }

        List<Map<String, Object>> results = new ArrayList<>();
        int correct = 0;

        for (QuizSubmitRequest.QuizAnswer answer : submitRequest.getAnswers()) {
            int idx = answer.getQuestionIndex();
            if (idx < 0 || idx >= questions.size()) continue;

            Map<String, Object> question = questions.get(idx);
            String correctAnswer = (String) question.get("correctAnswer");
            boolean isCorrect = correctAnswer.equals(answer.getSelectedOption());
            if (isCorrect) correct++;

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("questionIndex", idx);
            result.put("question", question.get("question"));
            result.put("selectedOption", answer.getSelectedOption());
            result.put("correctAnswer", correctAnswer);
            result.put("isCorrect", isCorrect);
            result.put("explanation", question.get("explanation"));
            results.add(result);
        }

        int total = submitRequest.getAnswers().size();
        double percentage = total > 0 ? (double) correct / total * 100 : 0;

        return Map.of(
                "score", correct,
                "total", total,
                "percentage", Math.round(percentage),
                "passed", percentage >= 60,
                "results", results
        );
    }
}