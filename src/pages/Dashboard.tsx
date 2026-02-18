import { useState } from "react";
import { motion } from "framer-motion";
import AppSidebar from "@/components/layout/AppSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeChat, setActiveChat] = useState("1");

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <motion.div
        className="fixed inset-y-0 left-0 z-40 md:hidden"
        initial={{ x: -300 }}
        animate={{ x: mobileOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AppSidebar
          collapsed={false}
          onToggle={() => setMobileOpen(false)}
          onNewChat={() => {}}
          activeChat={activeChat}
          onSelectChat={(id) => { setActiveChat(id); setMobileOpen(false); }}
        />
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNewChat={() => {}}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center h-14 border-b border-border px-4">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-secondary text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-3 text-sm font-semibold text-foreground">RAG Assistant</span>
        </div>

        <ChatWindow />
      </div>
    </div>
  );
};

export default Dashboard;
