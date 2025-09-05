import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8">
          {isUser ? (
            <>
              <AvatarImage src="/api/placeholder/32/32" alt="User" />
              <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
                U
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/api/placeholder/32/32" alt="Assistant" />
              <AvatarFallback className="bg-chat-surface border border-chat-border text-chat-primary text-sm font-semibold">
                AI
              </AvatarFallback>
            </>
          )}
        </Avatar>
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-assistant'}`}>
          <div className="prose prose-sm max-w-none">
            <p className="mb-0 leading-relaxed break-words whitespace-pre-wrap">{content}</p>
          </div>
        </div>

        {/* Message Actions */}
        <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          {timestamp && (
            <span className="text-xs text-chat-text-muted">
              {timestamp}
            </span>
          )}
          
          {!isUser && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 hover:bg-chat-border rounded-md"
                onClick={() => navigator.clipboard.writeText(content)}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 hover:bg-chat-border rounded-md"
              >
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 hover:bg-chat-border rounded-md"
              >
                <ThumbsDown className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;