import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

if (!process.env.OPENAI_API_KEY) {
  console.warn("Warning: OPENAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || 'missing-api-key'
});

export async function generateChatResponse(message: string, username: string): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'missing-api-key') {
      throw new Error("OpenAI API key is not configured");
    }

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are LawAIBot, an AI-powered legal assistant that helps users understand legal concepts, 
                    provides guidance on legal issues, and explains complex legal terminology in simple terms.
                    Respond in a friendly, professional manner with accurate legal information.
                    Format your responses with HTML tags like <p>, <strong>, <em>, <ol>, <ul>, <li> for better readability.
                    When addressing the user, use their name: ${username}.
                    Remember that you are not a lawyer and cannot provide official legal advice, but rather general legal information.
                    Never invent law or facts.`
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
}
