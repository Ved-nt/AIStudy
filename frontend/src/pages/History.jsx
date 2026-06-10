import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import PageContainer from "../components/layout/PageContainer";
import BackgroundEffects from "../components/layout/BackgroundEffects";
import SectionTitle from "../components/common/SectionTitle";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import HistoryCard from "../components/history/HistoryCard";

import { studyAPI, quizAPI } from "../services/api";

export default function History() {

  const [studyHistory, setStudyHistory] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);

  const [activeTab, setActiveTab] =
    useState("study");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      setLoading(true);

      const studyData =
        await studyAPI.history();

      const quizData =
        await quizAPI.history();

      console.log("Study History:", studyData);
      console.log("Quiz History:", quizData);

      setStudyHistory(
  Array.isArray(studyData)
    ? studyData
    : []
);

setQuizHistory(
  Array.isArray(quizData)
    ? quizData
    : []
);

    } catch (err) {

      console.error(err);

      setError("Failed to load history");

    } finally {

      setLoading(false);
    }
  };

  const currentData =
  activeTab === "study"
    ? (studyHistory || [])
    : (quizHistory || []);

  return (

    <div className="min-h-screen bg-[#07070b] text-white relative overflow-hidden">

      <BackgroundEffects />

      <PageContainer>

        {/* Title */}
        <SectionTitle
          icon="🕘"
          title="History"
          subtitle="Track your study notes and quiz performance."
        />

        {/* Buttons */}
        <div className="flex gap-4 mt-8 mb-10">

          <button
            onClick={() => setActiveTab("study")}
            className={`
              px-5 py-3 rounded-2xl text-sm border
              transition-all duration-300
              ${
                activeTab === "study"
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                  : "bg-white/5 border-white/10 text-white/50"
              }
            `}
          >
            📖 Study History
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`
              px-5 py-3 rounded-2xl text-sm border
              transition-all duration-300
              ${
                activeTab === "quiz"
                  ? "bg-violet-500/20 border-violet-400 text-violet-300"
                  : "bg-white/5 border-white/10 text-white/50"
              }
            `}
          >
            🧠 Quiz History
          </button>
        </div>

        {/* Loading */}
        {loading && (

          <div className="mt-20 flex justify-center">
            <Loader text="Loading history..." />
          </div>
        )}

        {/* Error */}
        {error && (
          <ErrorMessage message={error} />
        )}

        {/* Empty */}
        {!loading &&
          currentData.length === 0 && (

          <div className="
            border border-white/10
            rounded-3xl
            p-10
            bg-white/[0.03]
            text-center
          ">

            <h2 className="text-xl font-semibold mb-3">
              No history found
            </h2>

            <p className="text-white/40 text-sm">
              Your saved history will appear here.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading &&
          currentData.length > 0 && (

          <motion.div
            layout
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {currentData.map((item, index) => (

              <motion.div
                key={item.id || index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
              >

                <HistoryCard
                  item={item}
                  type={activeTab}
                />

              </motion.div>
            ))}
          </motion.div>
        )}

      </PageContainer>
    </div>
  );
}