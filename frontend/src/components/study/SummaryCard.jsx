export default function SummaryCard({ summary }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
      <p className="text-xs text-white/30 mb-3">
        SUMMARY
      </p>

      <p className="text-white/80 leading-relaxed text-sm">
        {summary}
      </p>
    </div>
  );
}