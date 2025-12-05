
import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;

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
  const response = await fetch("/api/generate-recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients: ingredientNames })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate recipes");
  }

  const data = await response.json();
  return data.recipes;
}
