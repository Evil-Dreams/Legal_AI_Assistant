import { FC, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "@shared/schema";
import { Scale } from "lucide-react";

interface ChatContainerProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

const ChatContainer: FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <main ref={containerRef} className="chat-container flex flex-col h-[calc(100vh-64px-80px)] overflow-y-auto p-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div className="message-bubble ai max-w-[85%] rounded-2xl bg-gray-100 text-gray-900 p-3 mb-2 animate-in fade-in duration-300 typing-indicator">
          <div className="mb-2 flex items-center">
            <div className="bg-primary-600 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium mr-2">
              <Scale className="h-4 w-4" />
            </div>
            <span className="font-medium text-gray-800">LawAIBot</span>
          </div>
          <div className="flex space-x-1">
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-ping [animation-delay:0ms]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-ping [animation-delay:200ms]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-ping [animation-delay:400ms]"></span>
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatContainer;
