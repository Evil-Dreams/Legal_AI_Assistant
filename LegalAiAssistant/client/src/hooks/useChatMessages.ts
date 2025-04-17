import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChatMessage, ChatResponse } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useChatMessages(username: string) {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch message history
  const { data: messageHistory = [], refetch } = useQuery({
    queryKey: ['/api/messages'],
    enabled: !!username,
  });

  // Send message mutation
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (content: string) => {
      // Send message to the API - username is now taken from the authenticated session
      const response = await apiRequest('POST', '/api/messages', { 
        content 
      });
      return await response.json() as ChatResponse;
    },
    onSuccess: () => {
      // Refresh messages after sending
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      setError(null);
    },
    onError: (err: Error) => {
      setError(`Failed to get AI response: ${err.message}`);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages: messageHistory as ChatMessage[],
    sendMessage,
    isLoading: isPending,
    error,
    dismissError,
  };
}
