import { FC } from "react";
import { Scale } from "lucide-react";

interface ChatHeaderProps {
  username: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({ username }) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : "?";
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Scale className="h-8 w-8 text-primary-600 mr-2" />
        <h1 className="font-serif font-bold text-xl text-gray-800">LawAIBot</h1>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-600 mr-2">{username}</span>
        <div className="bg-primary-100 text-primary-700 h-8 w-8 rounded-full flex items-center justify-center font-medium">
          {firstLetter}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
