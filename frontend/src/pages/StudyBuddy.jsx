import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

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
import { studyAPI } from "../services/api";

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

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error("Please enter some notes first.");
      return;
    }

    try {
      await summarize();
      toast.success("Summary generated successfully!");
    } catch (err) {
      if(err.response?.status==403){
        navigate("/login");
        return;
      }
      toast.error("Failed to generate summary.");
    }
  };

  const handleSave = async () => {
    if (!result) return;

    try {
      await studyAPI.save({
        text,
        title,
        summary: result.summary,
        keyPoints: result.keyPoints,
        keyConcepts: result.keyConcepts,
      });

      toast.success("Saved to history!");
    } catch (err) {
      toast.error("Failed to save note.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-white font-mono relative overflow-hidden">
      <BackgroundEffects />

      <PageContainer>
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/")}
          className="text-white/40 hover:text-white text-sm mb-10 transition-all"
        >
          ← Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            icon="📖"
            title="Study Buddy"
            subtitle="Paste notes and get AI-powered summaries instantly."
          />
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="
            space-y-5
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            rounded-3xl
            p-6
            shadow-[0_0_40px_rgba(139,92,246,0.08)]
          "
        >
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

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-xs text-white/30">
              {text.length} characters
            </span>

            <Button
              onClick={handleSummarize}
              disabled={loading}
              className="
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-lg
                shadow-violet-500/20
              "
            >
              {loading ? (
                <Loader text="Analyzing..." />
              ) : (
                "Summarize →"
              )}
            </Button>
          </div>

          <ErrorMessage message={error} />
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6 mt-10"
            >
              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <SummaryCard summary={result.summary} />
              </motion.div>

              {/* Key Points */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <KeyPoints points={result.keyPoints} />
              </motion.div>

              {/* Key Concepts */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <KeyConcepts concepts={result.keyConcepts} />
              </motion.div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end"
              >
                <Button
                  onClick={handleSave}
                  className="
                    bg-white/5
                    border border-white/10
                    hover:border-violet-500/40
                    hover:bg-violet-500/10
                    transition-all
                  "
                >
                  Save to History
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>
    </div>
  );
}