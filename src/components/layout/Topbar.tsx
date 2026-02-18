import { Circle } from "lucide-react";

const Topbar = () => {
  return (
    <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-[hsl(var(--card)/0.5)] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-foreground">RAG Assistant</h2>
        <div className="flex items-center gap-1.5">
          <Circle className="w-2 h-2 fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">GPT-4 Turbo · RAG Mode</span>
    </div>
  );
};

export default Topbar;
