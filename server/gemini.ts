import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface GeneratedRecipe {
  name: string;
  description: string;
  time: string;
  calories: string;
  difficulty: "Easy" | "Medium" | "Hard";
  steps: string[];
  ingredientsUsed: string[];
}

export async function generateRecipes(ingredientNames: string[]): Promise<GeneratedRecipe[]> {
  const systemPrompt = `You are an expert chef. Given a list of ingredients, create 3-4 creative and delicious recipes that use ONLY these ingredients (you can assume basic pantry staples like salt, pepper, water are available).

For each recipe, provide:
- name: A creative, appetizing name
- description: A short, mouth-watering description (1-2 sentences)
- time: Cooking time (e.g., "15 min", "30 min")
- calories: Estimated calories (e.g., "350 kcal")
- difficulty: Either "Easy", "Medium", or "Hard"
- steps: Array of 4-6 clear cooking instructions
- ingredientsUsed: Array of ingredient names from the provided list that are used

Return your response as a JSON object with a "recipes" array.`;

  const userPrompt = `Create recipes using these ingredients: ${ingredientNames.join(", ")}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            recipes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  time: { type: "string" },
                  calories: { type: "string" },
                  difficulty: { type: "string" },
                  steps: { type: "array", items: { type: "string" } },
                  ingredientsUsed: { type: "array", items: { type: "string" } }
                },
                required: ["name", "description", "time", "calories", "difficulty", "steps", "ingredientsUsed"]
              }
            }
          },
          required: ["recipes"]
        }
      },
      contents: userPrompt,
    });

    const rawJson = response.text;
    
    if (rawJson) {
      const data = JSON.parse(rawJson);
      return data.recipes || [];
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Failed to generate recipes. Please try again.");
  }
}
