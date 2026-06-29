"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Calendar } from "lucide-react";
import GlowButton from "./GlowButton";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "What do you offer?",
  "How much does it cost?",
  "How long does a project take?",
  "Can I book a call?"
];

const botResponses: Record<string, string> = {
  "What do you offer?": "We offer six services: AI Consulting, Cloud Servers, Custom Dashboards, Website Design, OpenClaw AI Setup, and SEO. All for small and medium businesses. Want to know more about any of these?",
  "How much does it cost?": "Prices start at $499 for websites. Check our Pricing page to see all plans, or we can talk about a custom price that fits your needs.",
  "How long does a project take?": "Most projects take 4–8 weeks. Simple websites can be done in 2–3 weeks. Big AI setups may take 10–12 weeks. We'll give you a clear timeline on our first call.",
  "Can I book a call?": "Yes! Book a free call with us and we'll walk you through how we can help. Click below to get started."
};

const defaultResponse = "Good question! Would you like to book a free call with us? We can answer all your questions and find the best fit for your business.";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm m3DS AI. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("chatOpen");
    if (saved) setIsOpen(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responseText = botResponses[text] || defaultResponse;
      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-primary text-white shadow-lg shadow-accent-glow flex items-center justify-center hover:brightness-90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] glass rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-primary to-accent-secondary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">m3DS AI</h3>
                <p className="text-white/80 text-xs">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "bot" 
                      ? "bg-accent-primary/20" 
                      : "bg-accent-secondary/20"
                  }`}>
                    {message.sender === "bot" ? (
                      <Bot className="w-4 h-4 text-accent-primary" />
                    ) : (
                      <User className="w-4 h-4 text-accent-secondary" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${
                    message.sender === "bot"
                      ? "bg-bg-card text-text-primary rounded-tl-none"
                      : "bg-accent-primary text-white rounded-tr-none"
                  }`}>
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-primary" />
                  </div>
                  <div className="bg-bg-card rounded-lg rounded-tl-none px-4 py-3 flex gap-1">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-text-muted"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-text-muted"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-text-muted"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="text-xs bg-bg-card hover:bg-accent-primary/20 text-text-secondary hover:text-accent-primary px-3 py-1.5 rounded-full transition-colors border border-border"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  className="w-10 h-10 rounded-lg bg-accent-primary text-white flex items-center justify-center hover:brightness-90 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 text-center">
                <GlowButton href="/contact/" variant="ghost" className="w-full text-xs py-2">
                  <Calendar className="w-3 h-3 mr-2" />
                  Book a Demo
                </GlowButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
