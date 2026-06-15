import { Plus } from "lucide-react";

export default function ChatHeader({
  onNewChat,
}) {
  return (
    <div
      className="
        h-16
        border-b
        border-white/10
        flex
        items-center
        justify-between
        px-6
      "
    >
      <h1
        className="
          text-xl
          font-bold
        "
      >
        AI Tutor
      </h1>

      <button
        onClick={onNewChat}
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-violet-600
          hover:bg-violet-700
          transition-all
        "
      >
        <Plus size={16} />

        New Chat
      </button>
    </div>
  );
}