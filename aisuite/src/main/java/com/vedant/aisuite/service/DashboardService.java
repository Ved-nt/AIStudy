package com.vedant.aisuite.service;

import com.vedant.aisuite.dto.DashboardResponse;
import com.vedant.aisuite.entity.Note;
import com.vedant.aisuite.entity.QuizHistory;
import com.vedant.aisuite.entity.User;
import com.vedant.aisuite.repository.NoteRepository;
import com.vedant.aisuite.repository.QuizHistoryRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) auth.getPrincipal();

        /*
         * USER-SPECIFIC DATA
         */
        List<QuizHistory> quizzes =
                quizRepo.findByUser(user);

        List<Note> notes =
                noteRepo.findByUser(user);

        /*
         * TOTAL QUIZZES
         */
        long totalQuizzes =
                quizzes.size();

        /*
         * AVERAGE SCORE
         */
        double averageScore =
                quizzes.stream()
                        .mapToDouble(
                                QuizHistory::getPercentage
                        )
                        .average()
                        .orElse(0);

        /*
         * HIGHEST SCORE
         */
        int highestScore =
                quizzes.stream()
                        .mapToInt(q ->
                                q.getPercentage().intValue()
                        )
                        .max()
                        .orElse(0);

        /*
         * TOTAL SUMMARIES
         */
        long totalSummaries =
                notes.size();

        /*
         * DIFFICULTY STATS
         */
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

        /*
         * RECENT ACTIVITY
         */
        List<Map<String, Object>> activity =
                new ArrayList<>();

        List<QuizHistory> recentQuizzes =
                quizRepo
                        .findTop5ByUserOrderByCreatedAtDesc(
                                user
                        );

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
                noteRepo
                        .findTop5ByUserOrderByCreatedAtDesc(
                                user
                        );

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

        /*
         * SORT BY DATE DESC
         */
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