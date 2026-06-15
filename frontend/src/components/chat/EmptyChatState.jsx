import { Bot } from "lucide-react";

export default function EmptyChatState() {
  return (
    <div
      className="
        flex-1
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          text-center
          max-w-md
        "
      >
        <Bot
          size={60}
          className="
            mx-auto
            mb-4
            text-violet-400
          "
        />

        <h2
          className="
            text-2xl
            font-bold
            mb-2
          "
        >
          Start a new conversation
        </h2>

        <p
          className="
            text-white/60
          "
        >
          Ask anything about
          programming, study
          notes, operating
          systems, DBMS,
          networking and more.
        </p>
      </div>
    </div>
  );
}