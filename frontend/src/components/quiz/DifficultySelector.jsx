import { DIFFICULTIES } from "../../utils/constants";

export default function DifficultySelector({
  difficulty,
  setDifficulty,
}) {
  return (
    <div className="flex gap-3">
      {DIFFICULTIES.map((d) => (
        <button
          key={d}
          onClick={() => setDifficulty(d)}
          className={`px-5 py-2 rounded-lg text-sm border transition-all ${
            difficulty === d
              ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
              : "border-white/10 text-white/30"
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}