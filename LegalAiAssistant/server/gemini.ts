import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if Gemini API key is set
if (!process.env.GEMINI_API_KEY) {
  console.warn("Warning: GEMINI_API_KEY is not set in environment variables");
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const MODEL_NAME = "gemini-1.5-pro";

export async function generateChatResponse(message: string, username: string, temperature: number = 0.5): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Create a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Namaste, I need help with Indian law" }],
        },
        {
          role: "model",
          parts: [{ text: "Namaste! I'm LawAIBot, your AI legal assistant specializing in Indian law. How can I help you today?" }],
        },
      ],
      generationConfig: {
        temperature: temperature,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Prepare system prompt based on temperature
    const getPersonality = () => {
      if (temperature < 0.3) {
        return `You are very formal, precise and professional. You use technical legal terminology and structured, 
                detailed responses. You cite specific sections of laws and provide comprehensive analysis.`;
      } else if (temperature < 0.7) {
        return `You balance formal legal analysis with approachable explanations. You explain legal concepts 
                clearly while maintaining professional credibility.`;
      } else {
        return `You are conversational, creative and engaging. You use colorful metaphors, stories, and relatable 
                examples to explain legal concepts. You have a sense of humor and personality while remaining informative.
                You sometimes roleplay as a quirky but knowledgeable legal advisor with a flair for dramatic explanations.`;
      }
    };

    const systemPrompt = `You are LawAIBot, an AI-powered legal assistant specializing in Indian laws and regulations.
                          You help users understand Indian legal concepts, provide guidance on Indian legal issues, and 
                          explain complex Indian legal terminology in simple terms.
                          
                          ${getPersonality()}
                          
                          Some important aspects of your knowledge:
                          - You are an expert in the Indian Constitution, IPC (Indian Penal Code), CrPC (Criminal Procedure Code), 
                            and other Indian legislation
                          - You know about recent Supreme Court of India judgments and High Court rulings
                          - You understand Indian civil law, criminal law, family law, and other specialized areas
                          - You're familiar with Indian legal procedures and court systems
                          
                          Format your responses with HTML tags like <p>, <strong>, <em>, <ol>, <ul>, <li> for better readability.
                          When addressing the user, use their name: ${username}.
                          
                          Remember that you are not a lawyer and cannot provide official legal advice, but rather general legal information.
                          Never invent law or facts. If you're unsure, admit it and suggest consulting a qualified Indian lawyer.`;

    // Send combined prompt to generate a response
    const result = await chat.sendMessage(systemPrompt + "\n\nUser message: " + message);
    const response = result.response;
    
    return response.text() || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini API error:", error);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
}