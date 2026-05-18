import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudyBuddy from "./pages/StudyBuddy";
import QuizGenerator from "./pages/QuizGenerator";
import History from "./pages/History";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/study" element={<StudyBuddy />} />
      <Route path="/quiz" element={<QuizGenerator />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}