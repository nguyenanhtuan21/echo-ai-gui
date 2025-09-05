import { useState } from "react";
import { MessageSquare, Plus, Search, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeToggle from "@/components/ThemeToggle";

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatSidebar = ({ isOpen, onToggle }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "Lập trình React hooks",
      lastMessage: "Cách sử dụng useState và useEffect",
      timestamp: "2 phút trước"
    },
    {
      id: "2", 
      title: "Thiết kế UI/UX",
      lastMessage: "Nguyên tắc thiết kế hiện đại",
      timestamp: "1 giờ trước"
    },
    {
      id: "3",
      title: "Machine Learning cơ bản",
      lastMessage: "Thuật toán phân loại dữ liệu",
      timestamp: "Hôm qua"
    },
    {
      id: "4",
      title: "TypeScript advanced",
      lastMessage: "Generic types và utility types",
      timestamp: "2 ngày trước"
    }
  ];

  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-50 h-full w-80 transform transition-transform duration-300 ease-in-out
        md:relative md:z-auto md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        chat-sidebar
      `}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-chat-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold chat-gradient-text">
                AI Chat
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="md:hidden hover-glow rounded-lg"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-xl py-3 hover-glow"
              onClick={() => {}}
            >
              <Plus className="w-4 h-4 mr-2" />
              Cuộc trò chuyện mới
            </Button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-chat-text-muted" />
              <Input
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 chat-input border-0 focus:ring-1"
              />
            </div>
          </div>

          {/* Chat History */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2">
              {filteredHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="group p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-chat-border/50 hover-glow border border-transparent hover:border-chat-border"
                >
                  <h3 className="font-medium text-chat-text truncate mb-1">
                    {chat.title}
                  </h3>
                  <p className="text-sm text-chat-text-muted truncate mb-2">
                    {chat.lastMessage}
                  </p>
                  <span className="text-xs text-chat-text-muted">
                    {chat.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Settings */}
          <div className="p-4 border-t border-chat-border">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="flex-1 justify-start hover-glow text-chat-text-muted hover:text-chat-text min-w-0"
              >
                <Settings className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="truncate">Cài đặt</span>
              </Button>
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;