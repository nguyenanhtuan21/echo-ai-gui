import { useState, useRef } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  return (
    <div className="border-t border-chat-border bg-chat-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-2 bg-chat-surface rounded-2xl border border-chat-border p-2 hover-glow">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 w-10 h-10 rounded-xl hover:bg-accent text-chat-text-muted hover:text-chat-text transition-colors"
            disabled={disabled}
          >
            <Paperclip className="w-4 h-4" />
          </Button>

          {/* Text Input Container */}
          <div className="flex-1 min-h-[44px] flex items-center">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn của bạn..."
              className="w-full min-h-[44px] max-h-[200px] border-0 bg-transparent resize-none focus:ring-0 focus:outline-none p-3 text-chat-text placeholder:text-chat-text-muted leading-relaxed"
              disabled={disabled}
              style={{ height: 'auto' }}
            />
          </div>

          {/* Voice Button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 w-10 h-10 rounded-xl hover:bg-accent text-chat-text-muted hover:text-chat-text transition-colors"
            disabled={disabled}
          >
            <Mic className="w-4 h-4" />
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            className="flex-shrink-0 w-10 h-10 bg-gradient-primary hover:opacity-90 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Helper Text */}
        <div className="flex justify-center mt-3">
          <p className="text-xs text-chat-text-muted">
            AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;