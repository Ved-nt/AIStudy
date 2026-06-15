import { MessageSquare } from "lucide-react";

export default function ChatConversationItem({
  conversation,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-left
        p-3
        rounded-xl
        transition-all
        border
        ${
          active
            ? "bg-violet-600/20 border-violet-500"
            : "bg-white/5 border-white/10 hover:bg-white/10"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <MessageSquare size={16} />

        <span
          className="
            text-sm
            truncate
          "
        >
          {conversation.title}
        </span>
      </div>
    </button>
  );
}