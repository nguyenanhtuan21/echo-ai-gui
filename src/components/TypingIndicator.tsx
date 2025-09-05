import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TypingIndicator = () => {
  return (
    <div className="flex gap-4 mb-6">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-chat-surface border border-chat-border text-chat-primary text-sm font-semibold">
            AI
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Typing Animation */}
      <div className="chat-message chat-message-assistant">
        <div className="flex items-center gap-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-chat-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-chat-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-chat-text-muted rounded-full animate-bounce"></div>
          </div>
          <span className="text-sm text-chat-text-muted ml-2">AI đang soạn tin...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;