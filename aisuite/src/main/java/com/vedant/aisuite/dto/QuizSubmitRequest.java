package com.vedant.aisuite.dto;

import java.util.List;

public class QuizSubmitRequest {

    private List<QuizAnswer> answers;

    public List<QuizAnswer> getAnswers() { return answers; }
    public void setAnswers(List<QuizAnswer> answers) { this.answers = answers; }

    public static class QuizAnswer {
        private int questionIndex;
        private String selectedOption;

        public int getQuestionIndex() { return questionIndex; }
        public void setQuestionIndex(int questionIndex) { this.questionIndex = questionIndex; }

        public String getSelectedOption() { return selectedOption; }
        public void setSelectedOption(String selectedOption) { this.selectedOption = selectedOption; }
    }
}