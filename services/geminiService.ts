import { GoogleGenAI } from "@google/genai";
import { Commune, Route } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askTravelAssistant = async (
  prompt: string, 
  contextCommune: Commune | null, 
  contextRoute: Route | null
): Promise<string> => {
  if (!apiKey) {
    return "Demo Mode: API Key is missing. Please configure the environment variable.";
  }

  try {
    const model = "gemini-2.5-flash";
    
    let systemContext = `You are a helpful travel assistant for the AMTPI (Asociația Metropolitană de Transport Public Iași). 
    Help the user navigate the Iași metropolitan area. Keep answers concise (under 80 words) and friendly. 
    The user is looking at an interactive map.`;

    if (contextCommune) {
      systemContext += `\nCurrently selected location: ${contextCommune.name}. Coordinates: ${contextCommune.lat}, ${contextCommune.lng}.`;
      systemContext += `\nAvailable routes: ${contextCommune.routes.map(r => `Bus ${r.number} (${r.name})`).join(', ')}.`;
    }

    if (contextRoute) {
      systemContext += `\nSpecifically asking about Route ${contextRoute.number}: ${contextRoute.name}.`;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemContext,
      }
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the transport network AI right now.";
  }
};