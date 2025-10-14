"use client";

import React, {
  useEffect,
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
} from "react";
import { runGeminiAi } from "@/actions/geminiai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const lastRef = useRef<HTMLDivElement>(null);

  // 发送消息
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await runGeminiAi(text);
      const safe = (reply ?? "").trim() || "No response";
      setMessages((prev) => [...prev, { sender: "bot", text: safe }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    lastRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Chat with AI Assistant
      </h1>

      {/* 聊天框 */}
      <div className="chat-box mb-4 max-h-96 overflow-y-auto border rounded-2xl p-4 bg-white shadow-sm space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-2xl rounded-bl-none animate-pulse">
              Typing…
            </div>
          </div>
        )}

        <div ref={lastRef} />
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Type your message..."
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
            }
          }}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-xl"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
