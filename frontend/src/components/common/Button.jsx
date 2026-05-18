export default function Button({
  children,
  onClick,
  loading,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all disabled:opacity-50 ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}