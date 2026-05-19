import { motion } from "framer-motion";

export default function HistoryCard({
  item,
  type,
}) {

  /**
   * QUIZ HISTORY CARD
   */
  if (type === "quiz") {

    return (

      <motion.div
        whileHover={{
          y: -6,
          scale: 1.01,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          relative
          overflow-hidden
          border border-violet-500/20
          bg-white/[0.04]
          backdrop-blur-2xl
          rounded-3xl
          p-6
          shadow-xl
          shadow-violet-500/10
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            top-[-100px]
            right-[-100px]
            w-[200px]
            h-[200px]
            bg-violet-500/10
            rounded-full
            blur-[80px]
          "
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-5">

          <div>

            <p className="
              text-[11px]
              tracking-[0.25em]
              uppercase
              text-violet-400
              mb-2
            ">
              Quiz Attempt
            </p>

            <h2 className="text-xl font-semibold text-white">
              {item.topic}
            </h2>

          </div>

          <div
            className={`
              px-3 py-1.5
              rounded-full
              text-xs
              font-semibold
              border
              ${
                item.percentage >= 60
                  ? `
                    bg-green-500/10
                    border-green-500/20
                    text-green-400
                  `
                  : `
                    bg-red-500/10
                    border-red-500/20
                    text-red-400
                  `
              }
            `}
          >

            {Math.round(item.percentage)}%

          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 space-y-3 text-sm">

          <div className="flex justify-between text-white/60">
            <span>Difficulty</span>

            <span className="text-white">
              {item.difficulty}
            </span>
          </div>

          <div className="flex justify-between text-white/60">
            <span>Score</span>

            <span className="text-white">
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
        <div className="
          relative z-10
          mt-6
          pt-4
          border-t border-white/5
        ">

          <p className="text-xs text-white/30">

            {item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleString()
              : "Unknown Date"}

          </p>

        </div>
      </motion.div>
    );
  }

  /**
   * STUDY HISTORY CARD
   */
  return (

    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        relative
        overflow-hidden
        border border-cyan-500/20
        bg-white/[0.04]
        backdrop-blur-2xl
        rounded-3xl
        p-6
        shadow-xl
        shadow-cyan-500/10
      "
    >

      {/* Glow */}
      <div
        className="
          absolute
          bottom-[-100px]
          left-[-100px]
          w-[220px]
          h-[220px]
          bg-cyan-500/10
          rounded-full
          blur-[90px]
        "
      />

      {/* Header */}
      <div className="relative z-10 mb-5">

        <p className="
          text-[11px]
          tracking-[0.25em]
          uppercase
          text-cyan-400
          mb-2
        ">
          Study Note
        </p>

        <h2 className="text-xl font-semibold text-white">
          {item.title}
        </h2>

      </div>

      {/* Summary */}
      <div className="relative z-10">

        <p className="
          text-white/65
          text-sm
          leading-relaxed
          line-clamp-5
        ">

          {item.summary}

        </p>

      </div>

      {/* Footer */}
      <div className="
        relative z-10
        mt-6
        pt-4
        border-t border-white/5
      ">

        <p className="text-xs text-white/30">

          {item.createdAt
            ? new Date(
                item.createdAt
              ).toLocaleString()
            : "Unknown Date"}

        </p>

      </div>
    </motion.div>
  );
}