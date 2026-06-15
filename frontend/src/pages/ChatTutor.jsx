import { useEffect, useRef, useState } from "react";

import { chatAPI } from "../services/api";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import EmptyChatState from "../components/chat/EmptyChatState";
import TypingIndicator from "../components/chat/TypingIndicator";
import Navbar from "../components/layout/Navbar";

export default function ChatTutor() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const loadConversations = async () => {
    try {
      const data = await chatAPI.getConversations();
      setConversations(data);

      if (!selectedConversation && data.length > 0) {
        openConversation(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openConversation = async (conversationId) => {
    try {
      setSelectedConversation(conversationId);

      const data = await chatAPI.getConversationMessages(conversationId);

      const formatted = data.flatMap((chat) => [
        { sender: "user", text: chat.userMessage },
        { sender: "ai", text: chat.aiResponse },
      ]);

      setMessages(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const createNewChat = async () => {
    console.log("New Chat clicked");
    try {
      const chat = await chatAPI.createConversation();
      console.log("Created Chat:", chat);

      setConversations((prev) => [chat, ...prev]);
      setSelectedConversation(chat.id);
      setMessages([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    console.log("Send clicked");
    if (!message.trim()) return;
    if (!selectedConversation) return;

    const currentMessage = message;

    setMessages((prev) => [...prev, { sender: "user", text: currentMessage }]);
    setMessage("");

    try {
      setLoading(true);

      const response = await chatAPI.sendMessage(
        selectedConversation,
        currentMessage
      );

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.aiResponse },
      ]);

      loadConversations();
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar fixed at top */}
      <Navbar />

      {/* Chat container pushed down by padding equal to Navbar height */}
      <div className="pt-20 h-[calc(100vh-80px)] flex">
        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelect={openConversation}
          onNewChat={createNewChat}
        />

        <div className="flex-1 flex flex-col">
          <ChatHeader />

          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <EmptyChatState />
            ) : (
              <ChatMessages messages={messages} />
            )}

            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          <ChatInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            onKeyDown={handleKeyDown}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
