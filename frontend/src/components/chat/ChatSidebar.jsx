import { Plus } from "lucide-react";
import ChatConversationItem from "./ChatConversationItem";

export default function ChatSidebar({
  conversations,
  selectedConversation,
  onSelect,
  onNewChat,
}) {
  return (
    <div
      className="
        w-80
        border-r
        border-white/10
        bg-[#0d0d14]
        p-4
        overflow-y-auto
        flex
        flex-col
      "
    >
      {/* New Chat Button */}

      <button
        onClick={onNewChat}
        className="
          flex
          items-center
          justify-center
          gap-2
          mb-4
          px-4
          py-3
          rounded-xl
          bg-violet-600
          hover:bg-violet-700
          transition
        "
      >
        <Plus size={18} />
        New Chat
      </button>

      {/* Conversation List */}

      <div className="space-y-2">
        {conversations.map((conversation) => (
          <ChatConversationItem
            key={conversation.id}
            conversation={conversation}
            active={
              selectedConversation ===
              conversation.id
            }
            onClick={() =>
              onSelect(conversation.id)
            }
          />
        ))}
      </div>
    </div>
  );
}