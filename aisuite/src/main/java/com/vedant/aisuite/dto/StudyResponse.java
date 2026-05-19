package com.vedant.aisuite.dto;

import java.util.List;

public class StudyResponse {

    private String summary;
    private List<String> keyPoints;
    private List<String> keyConcepts;

    public StudyResponse() {
    }

    public StudyResponse(
            String summary,
            List<String> keyPoints,
            List<String> keyConcepts
    ) {
        this.summary = summary;
        this.keyPoints = keyPoints;
        this.keyConcepts = keyConcepts;
    }

    public String getSummary() {
        return summary;
    }

    public List<String> getKeyPoints() {
        return keyPoints;
    }

    public List<String> getKeyConcepts() {
        return keyConcepts;
    }
}