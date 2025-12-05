import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { GeneratedRecipe } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Flame, Heart, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Recipe() {
  const [match, params] = useRoute("/recipe/:id");
  const [_, setLocation] = useLocation();
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentRecipe');
    if (stored) {
      setRecipe(JSON.parse(stored));
    }
  }, [params]);

  if (!match || !recipe) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Recipe not found</p>
        <Button onClick={() => setLocation("/results")}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
      <div className="relative h-[40vh] bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
        <div className="text-9xl opacity-30">🍽️</div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none"
            onClick={() => setLocation("/results")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
             <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none"
              data-testid="button-favorite"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 -mt-12 relative z-10 bg-background rounded-t-[40px] px-8 pt-10 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-muted rounded-full" />

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge 
              variant="outline" 
              className="rounded-full border-primary text-primary uppercase tracking-wider text-[10px] font-bold px-3 py-1"
              data-testid="badge-difficulty"
            >
              {recipe.difficulty}
            </Badge>
            <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
              <span className="flex items-center gap-1" data-testid="text-time">
                <Clock className="w-4 h-4 text-primary" /> {recipe.time}
              </span>
              <span className="flex items-center gap-1" data-testid="text-calories">
                <Flame className="w-4 h-4 text-primary" /> {recipe.calories}
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-foreground leading-tight mb-4" data-testid="text-recipe-name">
            {recipe.name}
          </h1>
          <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
            {recipe.description}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Ingredients <span className="text-muted-foreground text-sm font-normal">({recipe.ingredientsUsed.length})</span>
            </h3>
            <div className="space-y-3">
              {recipe.ingredientsUsed.map((ing, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-secondary/30" data-testid={`item-ingredient-${idx}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-sm">
                      🥘
                    </span>
                    <span className="font-medium">{ing}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary/50" />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4">Instructions</h3>
            <div className="space-y-6 relative pl-4 border-l-2 border-muted/50 ml-2">
              {recipe.steps.map((step, i) => (
                <div key={i} className="relative" data-testid={`item-step-${i}`}>
                  <span className="absolute -left-[21px] top-0 w-8 h-8 rounded-full bg-background border-2 border-muted text-muted-foreground text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-foreground/80 leading-relaxed pt-1 pl-4">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <div className="mt-10">
           <Button 
            className="w-full rounded-xl h-12 text-lg font-bold shadow-lg shadow-primary/20"
            data-testid="button-start-cooking"
          >
            Start Cooking Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
