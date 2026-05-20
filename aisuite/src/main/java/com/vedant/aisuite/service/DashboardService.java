package com.vedant.aisuite.service;

import com.vedant.aisuite.dto.DashboardResponse;
import com.vedant.aisuite.entity.Note;
import com.vedant.aisuite.entity.QuizHistory;
import com.vedant.aisuite.repository.NoteRepository;
import com.vedant.aisuite.repository.QuizHistoryRepository;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardService {

    private final QuizHistoryRepository quizRepo;

    private final NoteRepository noteRepo;

    public DashboardService(
            QuizHistoryRepository quizRepo,
            NoteRepository noteRepo
    ) {
        this.quizRepo = quizRepo;
        this.noteRepo = noteRepo;
    }

    public DashboardResponse getDashboardStats() {

        List<QuizHistory> quizzes =
                quizRepo.findAll();

        List<Note> notes =
                noteRepo.findAll();

        // Total quizzes
        long totalQuizzes =
                quizzes.size();

        // Average Score
        double averageScore =
                quizzes.stream()
                        .mapToDouble(QuizHistory::getPercentage)
                        .average()
                        .orElse(0);

        // Highest Score
        int highestScore =
                quizzes.stream()
                        .mapToInt(q ->
                                q.getPercentage().intValue()
                        )
                        .max()
                        .orElse(0);

        // Total summaries
        long totalSummaries =
                notes.size();

        // Difficulty stats
        Map<String, Long> difficultyStats =
                new HashMap<>();

        difficultyStats.put(
                "EASY",
                quizzes.stream()
                        .filter(q ->
                                "EASY".equalsIgnoreCase(
                                        q.getDifficulty()
                                ))
                        .count()
        );

        difficultyStats.put(
                "MEDIUM",
                quizzes.stream()
                        .filter(q ->
                                "MEDIUM".equalsIgnoreCase(
                                        q.getDifficulty()
                                ))
                        .count()
        );

        difficultyStats.put(
                "HARD",
                quizzes.stream()
                        .filter(q ->
                                "HARD".equalsIgnoreCase(
                                        q.getDifficulty()
                                ))
                        .count()
        );

        // Recent Activity
        List<Map<String, Object>> activity =
                new ArrayList<>();

        List<QuizHistory> recentQuizzes =
                quizRepo.findTop5ByOrderByCreatedAtDesc();

        for (QuizHistory quiz : recentQuizzes) {

            Map<String, Object> item =
                    new HashMap<>();

            item.put("type", "quiz");

            item.put(
                    "title",
                    quiz.getTopic()
            );

            item.put(
                    "createdAt",
                    quiz.getCreatedAt()
            );

            item.put(
                    "score",
                    quiz.getPercentage()
            );

            activity.add(item);
        }

        List<Note> recentNotes =
                noteRepo.findTop5ByOrderByCreatedAtDesc();

        for (Note note : recentNotes) {

            Map<String, Object> item =
                    new HashMap<>();

            item.put("type", "study");

            item.put(
                    "title",
                    note.getTitle()
            );

            item.put(
                    "createdAt",
                    note.getCreatedAt()
            );

            activity.add(item);
        }

        activity.sort((a, b) ->
                b.get("createdAt")
                        .toString()
                        .compareTo(
                                a.get("createdAt")
                                        .toString()
                        )
        );

        return new DashboardResponse(
                totalQuizzes,
                Math.round(averageScore),
                highestScore,
                totalSummaries,
                activity,
                difficultyStats
        );
    }
}