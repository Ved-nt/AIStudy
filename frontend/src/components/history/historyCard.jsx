export default function HistoryCard({ note }) {
  return (
    <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
      <h3 className="font-medium text-white">
        {note.title}
      </h3>

      <p className="text-white/50 text-sm mt-2">
        {note.summary}
      </p>
    </div>
  );
}