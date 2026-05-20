package com.vedant.aisuite.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.vedant.aisuite.dto.QuizRequest;
import com.vedant.aisuite.dto.QuizSubmitRequest;

import com.vedant.aisuite.entity.QuizHistory;
import com.vedant.aisuite.repository.QuizHistoryRepository;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuizService {

    private final AIService AIService;

    private final QuizHistoryRepository quizHistoryRepository;

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    // Questions Store
    private final Map<String, List<Map<String, Object>>>
            quizStore = new HashMap<>();

    // Metadata Store
    private final Map<String, Map<String, String>>
            quizMetaStore = new HashMap<>();

    public QuizService(
            AIService AIService,
            QuizHistoryRepository quizHistoryRepository
    ) {

        this.AIService = AIService;
        this.quizHistoryRepository =
                quizHistoryRepository;
    }

    /**
     * Generate Quiz
     */
    public Map<String, Object> generateQuiz(
            QuizRequest request
    ) {

        try {

            String rawResponse =
                    AIService.generateQuiz(
                            request.getTopic(),
                            request.getDifficulty(),
                            request.getNumberOfQuestions()
                    );

            List<Map<String, Object>> questions =
                    objectMapper.readValue(
                            rawResponse,
                            new TypeReference<
                                    List<Map<String, Object>>
                                    >() {}
                    );

            String quizId =
                    UUID.randomUUID().toString();

            // Store Questions
            quizStore.put(
                    quizId,
                    questions
            );

            /**
             * STORE QUIZ META
             */
            Map<String, String> meta =
                    new HashMap<>();

            meta.put(
                    "topic",
                    request.getTopic()
            );

            meta.put(
                    "difficulty",
                    request.getDifficulty()
            );

            quizMetaStore.put(
                    quizId,
                    meta
            );

            // Hide answers
            List<Map<String, Object>>
                    clientQuestions =
                    new ArrayList<>();

            for (Map<String, Object> q :
                    questions) {

                Map<String, Object> clientQ =
                        new LinkedHashMap<>();

                clientQ.put(
                        "question",
                        q.get("question")
                );

                clientQ.put(
                        "options",
                        q.get("options")
                );

                clientQuestions.add(clientQ);
            }

            return Map.of(
                    "quizId", quizId,
                    "topic", request.getTopic(),
                    "difficulty",
                    request.getDifficulty(),
                    "totalQuestions",
                    questions.size(),
                    "questions",
                    clientQuestions
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate quiz: "
                            + e.getMessage(),
                    e
            );
        }
    }

    /**
     * Submit Quiz
     */
    public Map<String, Object> submitQuiz(
            String quizId,
            QuizSubmitRequest submitRequest
    ) {

        List<Map<String, Object>> questions =
                quizStore.get(quizId);

        if (questions == null) {

            throw new RuntimeException(
                    "Quiz not found."
            );
        }

        List<Map<String, Object>> results =
                new ArrayList<>();

        int correct = 0;

        for (
                QuizSubmitRequest.QuizAnswer answer
                : submitRequest.getAnswers()
        ) {

            int idx =
                    answer.getQuestionIndex();

            if (
                    idx < 0
                            || idx >= questions.size()
            ) {
                continue;
            }

            Map<String, Object> question =
                    questions.get(idx);

            String correctAnswer =
                    (String) question.get(
                            "correctAnswer"
                    );

            boolean isCorrect =
                    correctAnswer.equals(
                            answer.getSelectedOption()
                    );

            if (isCorrect) {
                correct++;
            }

            Map<String, Object> result =
                    new LinkedHashMap<>();

            result.put(
                    "questionIndex",
                    idx
            );

            result.put(
                    "question",
                    question.get("question")
            );

            result.put(
                    "selectedOption",
                    answer.getSelectedOption()
            );

            result.put(
                    "correctAnswer",
                    correctAnswer
            );

            result.put(
                    "isCorrect",
                    isCorrect
            );

            result.put(
                    "explanation",
                    question.get("explanation")
            );

            results.add(result);
        }

        int total = questions.size();

        double percentage =
                total > 0
                        ? ((double) correct / total) * 100
                        : 0;

        /**
         * GET REAL META
         */
        Map<String, String> meta =
                quizMetaStore.get(quizId);

        String topic =
                meta.get("topic");

        String difficulty =
                meta.get("difficulty");

        /**
         * SAVE REAL QUIZ DATA
         */
        QuizHistory history =
                new QuizHistory(
                        topic,
                        difficulty,
                        correct,
                        total,
                        percentage
                );

        quizHistoryRepository.save(history);

        return Map.of(
                "score", correct,
                "totalQuestions", total,
                "percentage",
                Math.round(percentage),
                "passed",
                percentage >= 60,
                "results",
                results
        );
    }

    /**
     * Quiz History
     */
    public List<QuizHistory>
    getQuizHistory() {

        return quizHistoryRepository
                .findAll();
    }
}