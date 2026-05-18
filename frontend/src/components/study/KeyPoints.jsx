export default function KeyPoints({ points }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
      <p className="text-xs text-white/30 mb-4">
        KEY POINTS
      </p>

      <div className="space-y-3">
        {points?.map((point, index) => (
          <div
            key={index}
            className="flex gap-3 text-sm text-white/70"
          >
            <span className="text-violet-400 font-bold">
              0{index + 1}
            </span>

            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}