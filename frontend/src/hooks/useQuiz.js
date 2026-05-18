import { useState } from "react";
import { quizAPI } from "../services/api";

export default function useQuiz() {
  const [loading, setLoading] = useState(false);

  const generateQuiz = async (topic, difficulty, num) => {
    setLoading(true);

    try {
      return await quizAPI.generate(topic, difficulty, num);
    } finally {
      setLoading(false);
    }
  };

  return { generateQuiz, loading };
}