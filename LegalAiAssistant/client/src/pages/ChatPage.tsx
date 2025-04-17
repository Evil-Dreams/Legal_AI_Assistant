import { useAuth } from "@/hooks/use-auth";
import { useChatMessages } from "@/hooks/useChatMessages";
import ChatContainer from "@/components/ChatContainer";
import ChatInput from "@/components/ChatInput";
import ErrorNotification from "@/components/ErrorNotification";
import { Button } from "@/components/ui/button";
import { LogOut, Scale } from "lucide-react";

export default function ChatPage() {
  const { user, logoutMutation } = useAuth();
  const username = user?.username || "";
  const { messages, sendMessage, isLoading, error, dismissError } = useChatMessages(username);

  const handleSendMessage = (content: string) => {
    if (content.trim() && !isLoading) {
      sendMessage(content);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Chat Interface */}
      <header className="bg-primary text-primary-foreground shadow-md py-2 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Scale className="h-8 w-8 mr-2" />
          <h1 className="font-bold text-xl">LawAIBot</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Welcome, {username}</span>
            <div className="bg-primary-foreground/20 text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center font-medium">
              {username ? username.charAt(0).toUpperCase() : "?"}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      
      {/* Error Notification */}
      <ErrorNotification message={error} onDismiss={dismissError} />
    </div>
  );
}
