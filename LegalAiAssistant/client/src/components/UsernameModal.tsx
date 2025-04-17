import { FC, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const usernameSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50)
});

type UsernameFormValues = z.infer<typeof usernameSchema>;

interface UsernameModalProps {
  isOpen: boolean;
  onSubmit: (username: string) => void;
}

const UsernameModal: FC<UsernameModalProps> = ({ isOpen, onSubmit }) => {
  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: "" }
  });

  const handleSubmit = (values: UsernameFormValues) => {
    onSubmit(values.username);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-3">
            <User className="h-16 w-16 text-primary" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif font-bold text-gray-800 mb-2">Welcome to LawAIBot</DialogTitle>
            <DialogDescription className="text-gray-600">Your AI-powered legal assistant</DialogDescription>
          </DialogHeader>
        </div>
          
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">Enter your name to get started</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Continue to Chat
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameModal;
