import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-4">
          Study <span className="text-violet-400">Smarter.</span>
        </h1>

        <p className="text-white/40 max-w-md mx-auto">
          AI-powered study assistant for summaries and quizzes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/study")}
          className="border border-white/10 p-8 rounded-2xl cursor-pointer hover:border-violet-500/50"
        >
          <h2 className="text-2xl font-bold mb-3">📖 Study Buddy</h2>

          <p className="text-white/40">
            Summarize notes and extract concepts.
          </p>
        </div>

        <div
          onClick={() => navigate("/quiz")}
          className="border border-white/10 p-8 rounded-2xl cursor-pointer hover:border-cyan-500/50"
        >
          <h2 className="text-2xl font-bold mb-3">🧠 Quiz Generator</h2>

          <p className="text-white/40">
            Generate AI-powered quizzes instantly.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}