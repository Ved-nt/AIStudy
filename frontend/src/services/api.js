import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const studyAPI = {
  summarize: async (text, title) => {
    const res = await api.post("/study/summarize", {
      text,
      title,
    });

    return res.data;
  },

  save: async (text, title) => {
    const res = await api.post("/study/save", {
      text,
      title,
    });

    return res.data;
  },

  history: async () => {
    const res = await api.get("/study/history");
    return res.data;
  },
};

export const quizAPI = {
  generate: async (topic, difficulty, numberOfQuestions) => {
    const res = await api.post("/quiz/generate", {
      topic,
      difficulty,
      numberOfQuestions,
    });

    return res.data;
  },

  submit: async (quizId, answers) => {
    const res = await api.post(`/quiz/submit/${quizId}`, {
      answers,
    });

    return res.data;
  },
};