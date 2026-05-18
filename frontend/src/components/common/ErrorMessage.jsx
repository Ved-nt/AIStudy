export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-3 text-red-400 text-sm">
      {message}
    </div>
  );
}