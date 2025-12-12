export interface GeneratedRecipe {
  name: string;
  description: string;
  time: string;
  calories: string;
  difficulty: "Easy" | "Medium" | "Hard";
  steps: string[];
  ingredientsUsed: string[];
}

/**
 * Sends selected ingredients to the backend to generate recipes.
 * Filters out any null or undefined values before sending.
 * @param ingredientNames Array of ingredient names (strings) selected by the user
 * @returns Promise resolving to an array of GeneratedRecipe objects
 */
export async function generateRecipes(ingredientNames: (string | null | undefined)[]): Promise<GeneratedRecipe[]> {
  // Remove any null or undefined values
  const sanitizedIngredients = ingredientNames.filter(Boolean) as string[];

  if (sanitizedIngredients.length === 0) {
    throw new Error("No valid ingredients selected");
  }

  const response = await fetch("/api/generate-recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients: sanitizedIngredients })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate recipes");
  }

  const data = await response.json();
  return data.recipes;
                                                        }
