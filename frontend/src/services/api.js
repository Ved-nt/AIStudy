import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

/*
|--------------------------------------------------------------------------
| RESPONSE INTERCEPTOR
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {

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

  register: async (
    name,
    email,
    password,
    rememberMe
  ) => {

    const res = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
        rememberMe,
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  },

  login: async (
    email,
    password,
    rememberMe
  ) => {

    const res = await api.post(
      "/auth/login",
      {
        email,
        password,
        rememberMe,
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  },

  me: async () => {

    const res = await api.get(
      "/auth/me",
      {
        withCredentials: true,
      }
    );

    return res.data;
  },

  logout: async () => {

    const res = await api.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
  },
};

/*
|--------------------------------------------------------------------------
| STUDY API
|--------------------------------------------------------------------------
*/

export const studyAPI = {

  summarize: async (
    text,
    title
  ) => {

    const res = await api.post(
      "/study/summarize",
      {
        text,
        title,
      }
    );

    return res.data;
  },

  save: async (payload) => {

    const res = await api.post(
      "/study/save",
      payload
    );

    return res.data;
  },

  history: async () => {

    const res =
      await api.get("/study/history");

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

    const res = await api.post(
      "/quiz/generate",
      {
        topic,
        difficulty,
        numberOfQuestions,
      }
    );

    return res.data;
  },

  submit: async (
    quizId,
    answers
  ) => {

    const res = await api.post(
      `/quiz/submit/${quizId}`,
      {
        answers,
      }
    );

    return res.data;
  },

  history: async () => {

    const res =
      await api.get("/quiz/history");

    return res.data;
  },
};

/*
|--------------------------------------------------------------------------
| DASHBOARD API
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| DASHBOARD API
|--------------------------------------------------------------------------
*/

export const dashboardAPI = {

  getStats: async () => {

    const res =
      await api.get("/dashboard");

    return res.data;
  },

  getStudyStats: async () => {

    const res =
      await api.get("/study/stats");

    return res.data;
  },
};

export default api;