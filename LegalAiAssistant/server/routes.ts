import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./gemini";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";
import { setupAuth } from "./auth";

// Authentication check middleware
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
};

// Message validation schema with temperature
const messageRequestSchema = insertMessageSchema.pick({
  content: true
}).extend({
  temperature: z.number().min(0).max(1).optional().default(0.5)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuth(app);

  // Get all messages
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Add a new message - requires authentication
  app.post("/api/messages", isAuthenticated, async (req, res) => {
    try {
      // Validate request body
      const result = messageRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request data", 
          errors: result.error.errors 
        });
      }
      
      const { content, temperature } = result.data;
      // We can assume req.user exists since isAuthenticated middleware has already run
      const username = req.user!.username; // Get username from the authenticated user
      
      // Save user message
      const userMessage = await storage.createMessage({
        username,
        content,
        isAi: false
      });
      
      // Generate AI response with temperature
      const aiResponse = await generateChatResponse(content, username, temperature);
      
      // Save AI response
      const aiMessage = await storage.createMessage({
        username,
        content: aiResponse,
        isAi: true
      });
      
      res.status(201).json({ content: aiResponse });
    } catch (error: any) {
      console.error("Error creating message:", error);
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
