import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessages({ messages }) {
  return (
    <div className="space-y-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`
              max-w-[80%]
              px-5
              py-4
              rounded-2xl
              ${
                msg.sender === "user"
                  ? "bg-violet-600 text-white"
                  : "bg-white/10 text-gray-100"
              }
            `}
          >
            {msg.sender === "user" ? (
              msg.text
            ) : (
              <div
                className="
                  leading-7
                  [&_h1]:text-3xl
                  [&_h1]:font-bold
                  [&_h1]:mb-4
                  [&_h2]:text-2xl
                  [&_h2]:font-semibold
                  [&_h2]:mt-6
                  [&_h2]:mb-3
                  [&_h3]:text-xl
                  [&_h3]:font-semibold
                  [&_h3]:mt-4
                  [&_h3]:mb-2
                  [&_p]:mb-3
                  [&_ul]:list-disc
                  [&_ul]:pl-6
                  [&_ol]:list-decimal
                  [&_ol]:pl-6
                  [&_li]:mb-1
                  [&_strong]:font-bold
                  [&_code]:bg-black/30
                  [&_code]:px-1
                  [&_code]:rounded
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}