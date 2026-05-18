export default function KeyConcepts({ concepts }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
      <p className="text-xs text-white/30 mb-4">
        KEY CONCEPTS
      </p>

      <div className="flex flex-wrap gap-2">
        {concepts?.map((concept, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full
            bg-violet-500/10
            border border-violet-500/30
            text-violet-400 text-xs"
          >
            {concept}
          </span>
        ))}
      </div>
    </div>
  );
}