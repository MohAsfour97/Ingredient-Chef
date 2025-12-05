import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { generateRecipes } from "./gemini";
import { z } from "zod";

const generateRecipesSchema = z.object({
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required")
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/generate-recipes", isAuthenticated, async (req, res) => {
    try {
      const { ingredients } = generateRecipesSchema.parse(req.body);
      
      const recipes = await generateRecipes(ingredients);
      
      res.json({ recipes });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: error.errors 
        });
      }
      
      console.error("Error in /api/generate-recipes:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to generate recipes" 
      });
    }
  });

  return httpServer;
}
