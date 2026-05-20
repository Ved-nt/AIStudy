import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import StudyBuddy from "./pages/StudyBuddy";
import QuizGenerator from "./pages/QuizGenerator";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study" element={<StudyBuddy />} />
        <Route path="/quiz" element={<QuizGenerator />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </div>
  );
}