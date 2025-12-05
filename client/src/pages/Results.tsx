import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ingredients } from "@/lib/mockData";
import { GeneratedRecipe } from "@/lib/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Flame, ChefHat, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Results() {
  const [_, setLocation] = useLocation();
  const [recipes, setRecipes] = useState<GeneratedRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedIngredients');
    if (!stored) {
      setLocation("/");
      return;
    }

    const selectedIds = JSON.parse(stored);
    const selectedIngredients = ingredients.filter(i => selectedIds.includes(i.id));
    
    const recipesData = localStorage.getItem('generatedRecipes');
    if (recipesData) {
      setRecipes(JSON.parse(recipesData));
    }
  }, [setLocation]);

  const handleRecipeClick = (recipe: GeneratedRecipe, index: number) => {
    localStorage.setItem('currentRecipe', JSON.stringify(recipe));
    setLocation(`/recipe/${index}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => setLocation("/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <p className="text-muted-foreground mb-4">No recipes found. Please go back and select ingredients.</p>
          <Button onClick={() => setLocation("/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-10">
      <header className="pt-6 px-6 pb-4 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setLocation("/")} 
          className="-ml-2 rounded-full"
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading font-bold text-lg">Ready to Serve!</h1>
        <div className="w-9" />
      </header>

      <div className="px-6 space-y-6">
        <div className="text-center py-4">
          <h2 className="text-3xl font-heading font-bold text-primary mb-2">Bon Appétit!</h2>
          <p className="text-muted-foreground">
            I've created these custom dishes just for you.
          </p>
        </div>

        <div className="grid gap-6">
          {recipes.map((recipe, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all cursor-pointer group rounded-3xl bg-card"
                onClick={() => handleRecipeClick(recipe, index)}
                data-testid={`card-recipe-${index}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-8xl opacity-20">🍽️</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-heading mb-1" data-testid={`text-recipe-name-${index}`}>
                      {recipe.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time}</span>
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.calories}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 bg-card">
                  <p className="text-sm text-muted-foreground mb-3">{recipe.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredientsUsed.slice(0, 3).map((ingName, i) => (
                      <Badge key={i} variant="secondary" className="rounded-full font-normal bg-secondary/50">
                        {ingName}
                      </Badge>
                    ))}
                    {recipe.ingredientsUsed.length > 3 && (
                      <Badge variant="secondary" className="rounded-full font-normal bg-secondary/50">
                        +{recipe.ingredientsUsed.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full h-14 rounded-2xl border-dashed border-2 mt-4"
          onClick={() => setLocation("/")}
          data-testid="button-cook-else"
        >
          <ChefHat className="mr-2 w-4 h-4" /> Cook Something Else
        </Button>
      </div>
    </div>
  );
}
