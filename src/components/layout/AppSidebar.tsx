import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Plus, MessageSquare, LayoutDashboard, FileText, Settings,
  LogOut, ChevronLeft, ChevronRight, User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const chatHistory = [
  { id: "1", title: "How does vector search work?", date: "Today" },
  { id: "2", title: "Explain RAG architecture", date: "Today" },
  { id: "3", title: "Chunking strategies for PDFs", date: "Yesterday" },
  { id: "4", title: "Embedding model comparison", date: "Yesterday" },
  { id: "5", title: "LangChain vs LlamaIndex", date: "Last week" },
];

const navLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const mockUser = {
  name: "Alex Johnson",
  email: "alex@company.com",
  role: "Admin",
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  activeChat: string;
  onSelectChat: (id: string) => void;
}

const AppSidebar = ({ collapsed, onToggle, onNewChat, activeChat, onSelectChat }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen flex flex-col bg-[hsl(var(--sidebar-background))] border-r border-sidebar-border overflow-hidden flex-shrink-0"
    >
      {/* Top: Logo + Toggle */}
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-sm text-sidebar-accent-foreground">RAG Assistant</span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="p-1.5 rounded-lg bg-primary/10 mx-auto">
            <Zap className="w-5 h-5 text-primary" />
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors hidden md:block"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className={`w-full flex items-center gap-2 rounded-xl border border-dashed border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ${collapsed ? "p-2 justify-center" : "px-3 py-2.5"}`}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-sm">New Chat</span>}
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2">
        {!collapsed && (
          <p className="text-xs text-muted-foreground font-medium px-2 mb-2">Recent</p>
        )}
        {chatHistory.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full flex items-center gap-2 rounded-lg mb-0.5 text-left transition-all duration-200 ${
              collapsed ? "p-2 justify-center" : "px-3 py-2"
            } ${
              activeChat === chat.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm truncate">{chat.title}</span>
            )}
          </button>
        ))}
      </div>

      {/* Nav Links */}
      {!collapsed && (
        <div className="px-2 py-2 border-t border-sidebar-border">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* User Profile (RBA) */}
      <div className="border-t border-sidebar-border p-3">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
            </div>
          )}
          {!collapsed && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
              {mockUser.role}
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => navigate("/")}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
