import { FC, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorNotificationProps {
  message: string | null;
  onDismiss: () => void;
}

const ErrorNotification: FC<ErrorNotificationProps> = ({ message, onDismiss }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className={cn(
      "fixed bottom-24 left-0 right-0 mx-auto w-full max-w-md bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg",
      "flex items-center justify-between transition-all duration-300 transform",
      "animate-in fade-in slide-in-from-bottom-5 duration-300"
    )}>
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
        <span>{message}</span>
      </div>
      <button 
        onClick={onDismiss}
        className="text-red-600 hover:text-red-800"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ErrorNotification;
