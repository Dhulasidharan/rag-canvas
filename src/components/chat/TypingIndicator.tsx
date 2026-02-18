import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex gap-3 items-start"
  >
    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
      <Zap className="w-4 h-4 text-primary" />
    </div>
    <div className="bg-chat-ai border border-border rounded-2xl rounded-bl-md px-5 py-4 flex gap-1.5 items-center">
      <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot-1" />
      <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot-2" />
      <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot-3" />
    </div>
  </motion.div>
);

export default TypingIndicator;
