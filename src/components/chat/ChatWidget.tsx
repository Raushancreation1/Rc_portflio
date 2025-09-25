'use client';

import { useEffect, useRef, useState } from 'react';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; ts: number }[]>([
    { role: 'bot', text: 'Hi! How can I help you today?', ts: Date.now() },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages.length]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const now = Date.now();
    setMessages((m) => [...m, { role: 'user', text, ts: now }]);
    setInput('');
    setTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = (data && data.reply) || "I'm a demo assistant. Tell me about your project!";
      setMessages((m) => [...m, { role: 'bot', text: reply, ts: Date.now() }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: 'bot', text: "I'm having trouble reaching the server. Let's continue here.", ts: Date.now() },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed z-50 right-4 bottom-4">
      {/* Toggle Button */}
      {!open && (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <FiMessageCircle className="text-xl" />
          <span className="hidden sm:inline">Chat</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="w-[92vw] sm:w-96 h-[60vh] sm:h-[28rem] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white">
            <div className="font-semibold">Assistant</div>
            <button aria-label="Close chat" onClick={() => setOpen(false)} className="p-1 rounded hover:bg-indigo-500">
              <FiX />
            </button>
          </div>
          {/* Messages */}
          <div ref={listRef} className="px-3 py-3 h-[calc(100%-7.25rem)] overflow-y-auto space-y-2 bg-gray-50 dark:bg-gray-800">
            {messages.map((m) => (
              <div key={m.ts} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none">
                  Typing...
                </div>
              </div>
            )}
          </div>
          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              aria-label="Send"
              onClick={send}
              disabled={typing}
              className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
