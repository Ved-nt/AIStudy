import { Send } from "lucide-react";

export default function ChatInput({
  value,
  onChange,
  onSend,
  loading,
}) {

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      onSend();
    }
  };

  return (
    <div
      className="
        p-4
        border-t
        border-white/10
      "
    >
      <div
        className="
          flex
          gap-2
        "
      >
        <input
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          placeholder="Ask anything..."
          className="
            flex-1
            bg-white/5
            border
            border-white/10
            rounded-xl
            px-4
            py-3
            outline-none
          "
        />

        <button
          onClick={onSend}
          disabled={loading}
          className="
            px-4
            rounded-xl
            bg-violet-600
            disabled:opacity-50
          "
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}