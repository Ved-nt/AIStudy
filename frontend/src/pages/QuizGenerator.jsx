import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

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

  // Generate Quiz
  const handleGenerateQuiz = async () => {

    if (!topic.trim()) {

      setError("Please enter a topic.");
      toast.error("Please enter a topic.");

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

      toast.success("Quiz generated successfully!");

    } catch (err) {

      setError(err.message || "Failed to generate quiz");

      toast.error("Failed to generate quiz");

    } finally {

      setLoading(false);
    }
  };

  // Select Option
  const handleOptionSelect = (questionIndex, option) => {

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  // Submit Quiz
  const handleSubmitQuiz = async () => {

    // Validate unanswered questions
    if (Object.keys(answers).length < quiz.questions.length) {

      setError(
        `Please answer all ${quiz.questions.length} questions before submitting.`
      );

      toast.error("Please answer all questions.");

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

      // Backend will:
      // 1. evaluate answers
      // 2. calculate score
      // 3. save quiz history in PostgreSQL
      const data = await quizAPI.submit(
        quiz.quizId,
        formattedAnswers
      );

      setResult(data);

      toast.success(
        `Quiz submitted! Score: ${data.score}/${data.totalQuestions}`
      );

    } catch (err) {

      setError(err.message || "Failed to submit quiz");

      toast.error("Failed to submit quiz");

    } finally {

      setSubmitting(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#07070b] text-white font-mono relative overflow-hidden">

      <BackgroundEffects />

      <PageContainer>

        {/* Back Button */}
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="
            text-white/30
            hover:text-white/70
            text-sm
            mb-10
            transition-all
          "
        >
          ← Back
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <SectionTitle
            icon="🧠"
            title="Quiz Generator"
            subtitle="Generate AI-powered quizzes on any topic."
          />

        </motion.div>

        {/* Generate Quiz */}
        {!quiz && (

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="
              mt-8
              space-y-6
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              rounded-3xl
              p-6
              shadow-[0_0_40px_rgba(139,92,246,0.08)]
            "
          >

            {/* Topic */}
            <Input
              type="text"
              placeholder="Enter Topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            {/* Difficulty */}
            <div>

              <p className="
                text-white/40
                text-xs
                mb-3
                tracking-widest
              ">
                DIFFICULTY
              </p>

              <DifficultySelector
                difficulty={difficulty}
                setDifficulty={setDifficulty}
              />

            </div>

            {/* Number Of Questions */}
            <div>

              <div className="
                flex
                justify-between
                text-sm
                text-white/40
                mb-2
              ">
                <span>Questions</span>
                <span>{numberOfQuestions}</span>
              </div>

              <input
                type="range"
                min="3"
                max="15"
                value={numberOfQuestions}
                onChange={(e) =>
                  setNumberOfQuestions(Number(e.target.value))
                }
                className="
                  w-full
                  accent-violet-400
                  cursor-pointer
                "
              />

            </div>

            <ErrorMessage message={error} />

            {/* Generate Button */}
            <Button
              onClick={handleGenerateQuiz}
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                hover:scale-[1.01]
                transition-all
                duration-300
                shadow-lg
                shadow-violet-500/20
              "
            >

              {loading ? (
                <Loader text="Generating Quiz..." />
              ) : (
                "Generate Quiz →"
              )}

            </Button>

          </motion.div>
        )}

        {/* Quiz Questions */}
        <AnimatePresence>

          {quiz && !result && (

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6 mt-8"
            >

              {/* Quiz Header */}
              <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              ">

                <div>

                  <h2 className="text-2xl font-bold">
                    {quiz.topic}
                  </h2>

                  <p className="text-white/40 text-sm mt-1">
                    {quiz.totalQuestions} Questions •{" "}
                    {quiz.difficulty}
                  </p>

                </div>

                {/* New Quiz */}
                <button
                  onClick={() => {
                    setQuiz(null);
                    setAnswers({});
                    setResult(null);
                  }}
                  className="
                    text-sm
                    text-white/30
                    hover:text-white/70
                    transition-all
                  "
                >
                  New Quiz
                </button>

              </div>

              {/* Questions */}
              <div className="space-y-5">

                {quiz.questions.map((question, index) => (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >

                    <QuestionCard
                      question={question}
                      index={index}
                      selected={answers[index]}
                      onSelect={(option) =>
                        handleOptionSelect(index, option)
                      }
                    />

                  </motion.div>
                ))}
              </div>

              <ErrorMessage message={error} />

              {/* Progress */}
              <div className="
                flex
                justify-between
                items-center
                text-sm
                text-white/40
              ">

                <span>
                  Answered {Object.keys(answers).length} /{" "}
                  {quiz.questions.length}
                </span>

                <span>
                  {
                    Math.round(
                      (
                        Object.keys(answers).length /
                        quiz.questions.length
                      ) * 100
                    )
                  }%
                </span>

              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="
                  w-full
                  bg-gradient-to-r
                  from-violet-600
                  to-fuchsia-600
                  hover:scale-[1.01]
                  transition-all
                  duration-300
                  shadow-lg
                  shadow-violet-500/20
                "
              >

                {submitting ? (
                  <Loader text="Submitting..." />
                ) : (
                  "Submit Quiz →"
                )}

              </Button>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>

          {result && (

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6 mt-8"
            >

              {/* Score Card */}
              <QuizResult result={result} />

              {/* Detailed Results */}
              <div className="space-y-4">

                {result.results.map((item, index) => (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      border
                      rounded-2xl
                      p-5
                      backdrop-blur-xl
                      ${
                        item.isCorrect
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-red-500/30 bg-red-500/5"
                      }
                    `}
                  >

                    <div className="flex items-start gap-3 mb-3">

                      <span className="text-lg">
                        {item.isCorrect ? "✓" : "✗"}
                      </span>

                      <p className="
                        text-sm
                        text-white/85
                        leading-relaxed
                      ">
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

                    <p className="
                      text-xs
                      text-white/40
                      italic
                      leading-relaxed
                    ">
                      {item.explanation}
                    </p>

                  </motion.div>
                ))}
              </div>

              {/* Retry */}
              <Button
                onClick={() => {
                  setQuiz(null);
                  setResult(null);
                  setAnswers({});
                }}
                className="
                  w-full
                  border border-white/10
                  bg-white/[0.03]
                  hover:bg-white/[0.05]
                  hover:border-white/20
                  transition-all
                "
              >
                Generate Another Quiz
              </Button>

            </motion.div>
          )}
        </AnimatePresence>

      </PageContainer>
    </div>
  );
}