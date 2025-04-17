import { nanoid } from "nanoid";
import { messages, users, type User, type InsertUser, type Message, type InsertMessage, type ChatMessage } from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMessages(): Promise<ChatMessage[]>;
  createMessage(message: InsertMessage): Promise<ChatMessage>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize by ensuring we have a welcome message
    this.ensureWelcomeMessage();
  }

  private async ensureWelcomeMessage() {
    try {
      // Check if we have any messages
      const existingMessages = await db.select().from(messages).limit(1);
      
      if (existingMessages.length === 0) {
        // Add welcome message
        await db.insert(messages).values({
          username: "system",
          content: "<p>Namaste! 🙏 Welcome to LawAIBot!</p><p>I'm your AI legal assistant specializing in <strong>Indian laws</strong>. I can help you understand Indian legal concepts, provide guidance on legal issues in India, and explain complex Indian legal terminology in simple terms.</p><p>Feel free to ask me about the Indian Constitution, IPC, property laws, family matters, or any other Indian legal questions you might have.</p>",
          isAi: true,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error("Error ensuring welcome message:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getMessages(): Promise<ChatMessage[]> {
    const dbMessages = await db
      .select()
      .from(messages)
      .orderBy(asc(messages.timestamp));
    
    // Transform database messages to ChatMessage format
    return dbMessages.map(msg => ({
      id: msg.id.toString(), // Convert number id to string
      content: msg.content,
      isAi: msg.isAi,
      timestamp: msg.timestamp
    }));
  }

  async createMessage(insertMessage: InsertMessage): Promise<ChatMessage> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    
    // Transform to ChatMessage format
    return {
      id: message.id.toString(), // Convert number id to string
      content: message.content,
      isAi: message.isAi,
      timestamp: message.timestamp
    };
  }
}

export const storage = new DatabaseStorage();
