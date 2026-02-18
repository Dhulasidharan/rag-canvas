import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border p-4 bg-[hsl(var(--card)/0.3)] backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your documents..."
          rows={1}
          disabled={disabled}
          className="w-full resize-none rounded-2xl bg-input/50 border border-border px-5 py-3.5 pr-14 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:glow-ring transition-all duration-300 scrollbar-thin"
          style={{ minHeight: 48, maxHeight: 160 }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = Math.min(target.scrollHeight, 160) + "px";
          }}
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-primary-foreground hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      <p className="text-center text-[10px] text-muted-foreground/50 mt-2">
        RAG Assistant may produce inaccurate information. Verify important facts.
      </p>
    </div>
  );
};

export default ChatInput;
