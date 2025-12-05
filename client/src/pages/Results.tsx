import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { recipes, ingredients } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Flame, ChefHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Results() {
  const [_, setLocation] = useLocation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('selectedIngredients');
    if (stored) {
      setSelectedIds(JSON.parse(stored));
    }
  }, []);

  // In a real app, we'd filter recipes based on ingredients. 
  // For this mock, we'll just show all of them but maybe highlight matches.
  
  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-10">
      <header className="pt-6 px-6 pb-4 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/")} className="-ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading font-bold text-lg">Ready to Serve!</h1>
        <div className="w-9" /> {/* Spacer */}
      </header>

      <div className="px-6 space-y-6">
        <div className="text-center py-4">
          <h2 className="text-3xl font-heading font-bold text-primary mb-2">Bon Appétit!</h2>
          <p className="text-muted-foreground">
            Based on your {selectedIds.length} ingredients, I've prepared these dishes for you.
          </p>
        </div>

        <div className="grid gap-6">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all cursor-pointer group rounded-3xl"
                onClick={() => setLocation(`/recipe/${recipe.id}`)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-heading mb-1">{recipe.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time}</span>
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.calories}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 bg-card">
                  <div className="flex flex-wrap gap-2">
                    {recipe.requiredIngredients.slice(0, 3).map(ingId => {
                      const ing = ingredients.find(i => i.id === ingId);
                      return ing ? (
                        <Badge key={ingId} variant="secondary" className="rounded-full font-normal bg-secondary/50">
                           {ing.emoji} {ing.name}
                        </Badge>
                      ) : null;
                    })}
                    {recipe.requiredIngredients.length > 3 && (
                       <Badge variant="secondary" className="rounded-full font-normal bg-secondary/50">
                         +{recipe.requiredIngredients.length - 3} more
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
        >
          <ChefHat className="mr-2 w-4 h-4" /> Cook Something Else
        </Button>
      </div>
    </div>
  );
}
