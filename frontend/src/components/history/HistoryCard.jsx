import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryCard({ item, type }) {

  const [expanded, setExpanded] = useState(false);

  // =========================
  // QUIZ HISTORY CARD
  // =========================
  if (type === "quiz") {

    return (

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="
          border border-violet-500/20
          bg-white/[0.03]
          backdrop-blur-2xl
          rounded-2xl
          p-5
          shadow-lg
          shadow-violet-500/5
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-4">

          <div>
            <p className="text-xs text-violet-400 tracking-widest mb-1">
              QUIZ
            </p>

            <h3 className="text-lg font-semibold text-white">
              {item.topic}
            </h3>
          </div>

          <div
            className={`
              px-3 py-1 rounded-full text-xs font-medium border
              ${
                item.percentage >= 60
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }
            `}
          >
            {Math.round(item.percentage)}%
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">

          <div className="flex justify-between text-white/60">
            <span>Difficulty</span>
            <span>{item.difficulty}</span>
          </div>

          <div className="flex justify-between text-white/60">
            <span>Score</span>

            <span>
              {item.score} / {item.totalQuestions}
            </span>
          </div>

          <div className="flex justify-between text-white/60">
            <span>Status</span>

            <span
              className={
                item.percentage >= 60
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {item.percentage >= 60
                ? "Passed"
                : "Failed"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <p className="text-xs text-white/30">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      </motion.div>
    );
  }

  // =========================
  // STUDY HISTORY CARD
  // =========================
  return (

    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        border border-cyan-500/20
        rounded-2xl
        p-5
        bg-white/[0.03]
        backdrop-blur-2xl
        shadow-lg
        shadow-cyan-500/5
      "
    >

      {/* Header */}
      <div className="mb-4">

        <p className="text-xs text-cyan-400 tracking-widest mb-1">
          STUDY NOTE
        </p>

        <h3 className="text-lg font-semibold text-white">
          {item.title}
        </h3>
      </div>

      {/* Summary */}
      <AnimatePresence mode="wait">

        <motion.div
          key={expanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >

          <p
            className={`
              text-white/70
              text-sm
              leading-relaxed
              whitespace-pre-line
              transition-all
              duration-300
              ${
                expanded
                  ? ""
                  : "line-clamp-4"
              }
            `}
          >
            {item.summary}
          </p>

        </motion.div>

      </AnimatePresence>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-5">

        <button
          onClick={() => setExpanded(!expanded)}
          className="
            text-xs
            text-cyan-400
            hover:text-cyan-300
            transition-all
          "
        >
          {expanded
            ? "Show Less ↑"
            : "Read Full Summary →"}
        </button>

        <p className="text-xs text-white/30">
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
