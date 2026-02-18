import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ChatMessage, { Message } from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import Topbar from "@/components/layout/Topbar";
import { Zap } from "lucide-react";

const mockResponses = [
  "RAG (Retrieval-Augmented Generation) works by combining a retrieval system with a generative model. When you ask a question, it first searches through your document corpus to find relevant passages, then uses those passages as context for the LLM to generate an accurate answer.\n\n```python\nfrom langchain import RetrievalQA\n\nqa_chain = RetrievalQA.from_chain_type(\n    llm=llm,\n    retriever=vectorstore.as_retriever()\n)\n```\n\nThis approach significantly reduces hallucinations and keeps answers grounded in your actual data.",
  "Great question! The key chunking strategies for documents include:\n\n1. **Fixed-size chunking** — Split by token/character count\n2. **Semantic chunking** — Split by meaning boundaries\n3. **Recursive splitting** — Hierarchically split by paragraphs, then sentences\n\nFor PDFs specifically, I'd recommend recursive splitting with overlap of ~100 tokens to maintain context across chunk boundaries.",
  "Vector embeddings are numerical representations of text that capture semantic meaning. Similar texts produce vectors that are close together in the embedding space. Popular models include OpenAI's `text-embedding-3-small` and open-source alternatives like `bge-large-en-v1.5`.",
];

// TODO: Replace with real chat API
async function sendMessage(message: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const response = await sendMessage(content);

    setIsTyping(false);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen flex-1 min-w-0">
      <Topbar />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="p-4 rounded-2xl bg-primary/10 glow-md mb-6">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">How can I help you today?</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Ask me anything about your documents. I'll search through your knowledge base and provide accurate, sourced answers.
            </p>
            <div className="flex flex-wrap gap-2 mt-6 max-w-lg justify-center">
              {["How does RAG work?", "Explain vector embeddings", "Best chunking strategies?"].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-4 py-2 rounded-xl border border-border bg-secondary/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:glow-sm transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto py-6 px-4 space-y-8">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow;
