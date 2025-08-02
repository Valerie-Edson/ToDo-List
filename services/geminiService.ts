
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || " " });

const subTaskSchema = {
  type: Type.OBJECT,
  properties: {
    subTasks: {
      type: Type.ARRAY,
      description: "A list of simple, actionable sub-tasks.",
      items: {
        type: Type.STRING,
        description: "A single sub-task.",
      },
    },
  },
  required: ["subTasks"],
};


export const suggestSubTasks = async (mainTask: string): Promise<string[]> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a productivity assistant. Your goal is to break down a high-level task into a list of simple, actionable sub-tasks.
      Task: "${mainTask}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: subTaskSchema,
        temperature: 0.5,
      }
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
      throw new Error("Received an empty response from the AI.");
    }
    
    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.subTasks)) {
      return parsed.subTasks.filter((task: unknown) => typeof task === 'string' && task.length > 0);
    } else {
      console.error("Unexpected JSON structure:", parsed);
      throw new Error("AI response was not in the expected format.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get suggestions from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching AI suggestions.");
  }
};
