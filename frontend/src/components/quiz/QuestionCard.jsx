export default function QuestionCard({
  question,
  index,
  selected,
  onSelect,
}) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
      <p className="text-white/90 mb-4">
        Q{index + 1}. {question.question}
      </p>

      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`w-full text-left px-4 py-2 rounded-lg border ${
              selected === opt
                ? "border-cyan-500/50 bg-cyan-500/10"
                : "border-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}