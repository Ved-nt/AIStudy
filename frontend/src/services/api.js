import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| JWT INTERCEPTOR
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| AUTH API
|--------------------------------------------------------------------------
*/

export const authAPI = {
  register: async (name, email, password) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return res.data;
  },

  login: async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  },
};

/*
|--------------------------------------------------------------------------
| STUDY API
|--------------------------------------------------------------------------
*/

export const studyAPI = {
  summarize: async (text, title) => {
    const res = await api.post("/study/summarize", {
      text,
      title,
    });

    return res.data;
  },

  save: async (payload) => {
    const res = await api.post("/study/save", payload);

    return res.data;
  },

  history: async () => {
    const res = await api.get("/study/history");

    return res.data;
  },
};

/*
|--------------------------------------------------------------------------
| QUIZ API
|--------------------------------------------------------------------------
*/

export const quizAPI = {
  generate: async (
    topic,
    difficulty,
    numberOfQuestions
  ) => {
    const res = await api.post("/quiz/generate", {
      topic,
      difficulty,
      numberOfQuestions,
    });

    return res.data;
  },

  submit: async (quizId, answers) => {
    const res = await api.post(
      `/quiz/submit/${quizId}`,
      {
        answers,
      }
    );

    return res.data;
  },

  history: async () => {
    const res = await api.get("/quiz/history");

    return res.data;
  },
};

/*
|--------------------------------------------------------------------------
| DASHBOARD API
|--------------------------------------------------------------------------
*/

export const dashboardAPI = {
  getStats: async () => {
    const res = await api.get("/dashboard");

    return res.data;
  },
};

export default api;