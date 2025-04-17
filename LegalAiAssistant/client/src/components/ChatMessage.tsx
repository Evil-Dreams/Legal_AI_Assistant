import { FC } from "react";
import { Scale } from "lucide-react";
import { format } from "date-fns";
import { ChatMessage as ChatMessageType } from "@shared/schema";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const formattedTime = format(new Date(message.timestamp), "h:mm a");
  
  if (message.isAi) {
    return (
      <div className="message-bubble ai max-w-[85%] rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-sm bg-gray-100 text-gray-900 p-3 mb-2 animate-in fade-in slide-in-from-left-5 duration-300">
        <div className="mb-2 flex items-center">
          <div className="bg-primary-600 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium mr-2">
            <Scale className="h-4 w-4" />
          </div>
          <span className="font-medium text-gray-800">LawAIBot</span>
        </div>
        <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content }} />
        <span className="text-xs text-gray-500 mt-2 block text-right">{formattedTime}</span>
      </div>
    );
  }
  
  return (
    <div className="message-bubble user max-w-[85%] ml-auto rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm bg-primary-600 text-white p-3 mb-2 animate-in fade-in slide-in-from-right-5 duration-300">
      <p className="whitespace-pre-wrap">{message.content}</p>
      <span className="text-xs text-white text-opacity-70 mt-2 block text-right">{formattedTime}</span>
    </div>
  );
};

export default ChatMessage;
