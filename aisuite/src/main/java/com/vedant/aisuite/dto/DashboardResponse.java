package com.vedant.aisuite.dto;

import java.util.List;
import java.util.Map;

public class DashboardResponse {
    private long totalQuizzesAttempted;
    private double averageScore;
    private int highestScore;
    private long totalSummariesGenerated;
    private List<Map<String, Object>> recentActivity;
    private Map<String, Long> quizzesByDifficulty;

    public DashboardResponse(long totalQuizzesAttempted, double averageScore, int highestScore, long totalSummariesGenerated, List<Map<String, Object>> recentActivity, Map<String, Long> quizzesByDifficulty) {
        this.totalQuizzesAttempted = totalQuizzesAttempted;
        this.averageScore = averageScore;
        this.highestScore = highestScore;
        this.totalSummariesGenerated = totalSummariesGenerated;
        this.recentActivity = recentActivity;
        this.quizzesByDifficulty = quizzesByDifficulty;
    }

    public long getTotalQuizzesAttempted() {
        return totalQuizzesAttempted;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public int getHighestScore() {
        return highestScore;
    }

    public long getTotalSummariesGenerated() {
        return totalSummariesGenerated;
    }

    public List<Map<String, Object>> getRecentActivity() {
        return recentActivity;
    }

    public Map<String, Long> getQuizzesByDifficulty() {
        return quizzesByDifficulty;
    }
}
