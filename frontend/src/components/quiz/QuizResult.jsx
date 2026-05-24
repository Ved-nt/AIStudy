export default function QuizResult({ result }) {
  return (
    <div className="space-y-4">
      <div className="border border-green-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-5xl font-bold mb-2">
          {result.percentage}%
        </h2>

        <p className="text-white/40">
          {result.score}/{result.totalQuestions} correct
        </p>
      </div>
    </div>
  );
}