import OpenAI from "openai";

// Referenced from javascript_openai integration
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// This is using OpenAI's API, which points to OpenAI's API servers and requires your own API key.
export const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

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
  const prompt = `You are an expert chef. Given these ingredients: ${ingredientNames.join(", ")}, create 3-4 creative and delicious recipes that use ONLY these ingredients (you can assume basic pantry staples like salt, pepper, water are available).

For each recipe, provide:
- name: A creative, appetizing name
- description: A short, mouth-watering description (1-2 sentences)
- time: Cooking time in minutes (e.g., "15 min", "30 min")
- calories: Estimated calories (e.g., "350 kcal")
- difficulty: Either "Easy", "Medium", or "Hard"
- steps: Array of 4-6 clear cooking instructions
- ingredientsUsed: Array of ingredient names from the provided list that are used in this recipe

Return your response as a JSON object with a "recipes" array containing these recipe objects.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a professional chef AI that creates accurate, practical recipes. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const result = JSON.parse(content);
    return result.recipes || [];
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Failed to generate recipes. Please try again.");
  }
}
