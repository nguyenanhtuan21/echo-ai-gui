import { useState } from "react";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Xin chào! Tôi là AI assistant của bạn. Tôi có thể giúp bạn trả lời câu hỏi, viết code, giải thích khái niệm, và nhiều thứ khác. Bạn cần hỗ trợ gì hôm nay?",
      timestamp: "Vừa xong"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: "Vừa xong"
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant", 
        content: "Cảm ơn bạn đã gửi tin nhắn! Đây là phản hồi mẫu từ AI. Trong ứng dụng thực tế, đây sẽ là phản hồi từ một mô hình AI như GPT, Gemini, hoặc DeepSeek.",
        timestamp: "Vừa xong"
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-chat-background">
      {/* Sidebar */}
      <ChatSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-chat-border bg-chat-surface">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden hover-glow rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-chat-text">
                Trò chuyện với AI
              </h1>
              <p className="text-sm text-chat-text-muted">
                Powered by AI Technology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-chat-text-muted">Trực tuyến</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="hover-glow rounded-lg border-chat-border hover:bg-chat-border/50"
            >
              <User className="w-4 h-4 mr-2" />
              Đăng nhập
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-4xl mx-auto space-y-0">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 hover-glow">
                  <span className="text-2xl">🤖</span>
                </div>
                <h2 className="text-2xl font-bold chat-gradient-text mb-2">
                  Chào mừng đến với AI Chat
                </h2>
                <p className="text-chat-text-muted max-w-md">
                  Bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn. AI sẽ giúp bạn trả lời câu hỏi và hỗ trợ nhiều tác vụ khác nhau.
                </p>
              </div>
            ) : (
              <div className="space-y-0 group">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput 
          onSend={handleSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};

export default Index;