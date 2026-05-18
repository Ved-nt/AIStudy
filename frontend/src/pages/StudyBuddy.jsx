import { useNavigate } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";
import BackgroundEffects from "../components/layout/BackgroundEffects";

import SectionTitle from "../components/common/SectionTitle";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import SummaryCard from "../components/study/SummaryCard";
import KeyConcepts from "../components/study/KeyConcepts";
import KeyPoints from "../components/study/KeyPoints";

import useStudy from "../hooks/useStudy";

export default function StudyBuddy() {
  const navigate = useNavigate();

  const {
    text,
    setText,
    title,
    setTitle,
    result,
    loading,
    error,
    summarize,
  } = useStudy();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono relative overflow-hidden">
      <BackgroundEffects />

      <PageContainer>
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="text-white/30 hover:text-white/60 text-sm mb-10"
        >
          ← Back
        </button>

        {/* Title */}
        <SectionTitle
          icon="📖"
          title="Study Buddy"
          subtitle="Paste notes and get AI-powered summaries instantly."
        />

        {/* Form */}
        <div className="space-y-5">
          <Input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextArea
            rows={10}
            placeholder="Paste notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-white/30">
              {text.length} characters
            </span>

            <Button
              onClick={summarize}
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-500"
            >
              {loading ? (
                <Loader text="Analyzing..." />
              ) : (
                "Summarize →"
              )}
            </Button>
          </div>

          <ErrorMessage message={error} />
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-6 mt-10">
            <SummaryCard summary={result.summary} />

            <KeyPoints points={result.keyPoints} />

            <KeyConcepts concepts={result.keyConcepts} />
          </div>
        )}
      </PageContainer>
    </div>
  );
}