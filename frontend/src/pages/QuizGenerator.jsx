import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer.jsx";
import BackgroundEffects from "../components/layout/BackgroundEffects.jsx";

import SectionTitle from "../components/common/SectionTitle.jsx";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

import DifficultySelector from "../components/quiz/DifficultySelector.jsx";
import QuestionCard from "../components/quiz/QuestionCard.jsx";
import QuizResult from "../components/quiz/QuizResult.jsx";

import { quizAPI } from "../services/api";

export default function QuizGenerator() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await quizAPI.generate(
        topic,
        difficulty,
        numberOfQuestions
      );

      setQuiz(data);
    } catch (err) {
      setError(err.message || "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = async () => {

    // Check unanswered questions
    if (Object.keys(answers).length < quiz.questions.length) {
      setError(
        `Please answer all ${quiz.questions.length} questions before submitting.`
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formattedAnswers = Object.entries(answers).map(
        ([questionIndex, selectedOption]) => ({
          questionIndex: Number(questionIndex),
          selectedOption,
        })
      );

      const data = await quizAPI.submit(
        quiz.quizId,
        formattedAnswers
      );

      setResult(data);

    } catch (err) {
      setError(err.message || "Failed to submit quiz");

    } finally {
      setSubmitting(false);
    }
};

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono relative overflow-hidden">
      <BackgroundEffects />

      <PageContainer>
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="text-white/30 hover:text-white/60 text-sm mb-10"
        >
          ← Back
        </button>

        {/* Title */}
        <SectionTitle
          icon="🧠"
          title="Quiz Generator"
          subtitle="Generate AI-powered quizzes on any topic."
        />

        {/* Generate Quiz */}
        {!quiz && (
          <div className="space-y-6">
            <Input
              type="text"
              placeholder="Enter Topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            {/* Difficulty */}
            <div>
              <p className="text-white/40 text-xs mb-3">
                DIFFICULTY
              </p>

              <DifficultySelector
                difficulty={difficulty}
                setDifficulty={setDifficulty}
              />
            </div>

            {/* Questions */}
            <div>
              <div className="flex justify-between text-sm text-white/40 mb-2">
                <span>Questions</span>
                <span>{numberOfQuestions}</span>
              </div>

              <input
                type="range"
                min="3"
                max="10"
                value={numberOfQuestions}
                onChange={(e) =>
                  setNumberOfQuestions(Number(e.target.value))
                }
                className="w-full accent-violet-400"
              />
            </div>

            <ErrorMessage message={error} />

            <Button
              onClick={handleGenerateQuiz}
              disabled={loading}
              className="w-full bg-violet-400 hover:bg-violet-400"
            >
              {loading ? (
                <Loader text="Generating Quiz..." />
              ) : (
                "Generate Quiz →"
              )}
            </Button>
          </div>
        )}

        {/* Quiz */}
        {quiz && !result && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {quiz.topic}
                </h2>

                <p className="text-white/40 text-sm">
                  {quiz.totalQuestions} Questions •{" "}
                  {quiz.difficulty}
                </p>
              </div>

              <button
                onClick={() => {
                  setQuiz(null);
                  setAnswers({});
                }}
                className="text-sm text-white/30 hover:text-white/60"
              >
                New Quiz
              </button>
            </div>

            {quiz.questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                index={index}
                selected={answers[index]}
                onSelect={(option) =>
                  handleOptionSelect(index, option)
                }
              />
            ))}

            <ErrorMessage message={error} />

            <Button
              onClick={handleSubmitQuiz}
              disabled={submitting}
              className="w-full bg-violet-400 hover:bg-violet-400"
            >
              {submitting ? (
                <Loader text="Submitting..." />
              ) : (
                "Submit Quiz →"
              )}
            </Button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <QuizResult result={result} />

            <div className="space-y-4">
              {result.results.map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-2xl p-5 ${
                    item.isCorrect
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-red-500/30 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span>
                      {item.isCorrect ? "✓" : "✗"}
                    </span>

                    <p className="text-sm text-white/80">
                      {item.question}
                    </p>
                  </div>

                  {!item.isCorrect && (
                    <p className="text-xs text-red-400 mb-2">
                      Your Answer: {item.selectedOption}
                    </p>
                  )}

                  <p className="text-xs text-green-400 mb-2">
                    Correct Answer: {item.correctAnswer}
                  </p>

                  <p className="text-xs text-white/40 italic">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => {
                setQuiz(null);
                setResult(null);
                setAnswers({});
              }}
              className="w-full border border-white/10 hover:border-white/20"
            >
              Generate Another Quiz
            </Button>
          </div>
        )}
      </PageContainer>
    </div>
  );
}