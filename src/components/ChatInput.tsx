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
        <div className="relative flex items-end gap-3 bg-chat-surface rounded-2xl border border-chat-border p-3 hover-glow">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 w-9 h-9 rounded-lg hover:bg-chat-border text-chat-text-muted hover:text-chat-text"
            disabled={disabled}
          >
            <Paperclip className="w-4 h-4" />
          </Button>

          {/* Text Input */}
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-1 min-h-[44px] max-h-[200px] border-0 bg-transparent resize-none focus:ring-0 focus:outline-none chat-input p-0 text-chat-text placeholder:text-chat-text-muted"
            disabled={disabled}
            style={{ height: 'auto' }}
          />

          {/* Voice Button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 w-9 h-9 rounded-lg hover:bg-chat-border text-chat-text-muted hover:text-chat-text"
            disabled={disabled}
          >
            <Mic className="w-4 h-4" />
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            className="flex-shrink-0 w-9 h-9 bg-gradient-primary hover:opacity-90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed p-0"
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