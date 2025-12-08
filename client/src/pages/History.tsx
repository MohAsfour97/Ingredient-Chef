
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { History as HistoryIcon, Clock, ChefHat, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CookedRecipe {
  id: string;
  name: string;
  description: string;
  time: string;
  cookedDate: string;
  timestamp: number;
}

export default function History() {
  const [, setLocation] = useLocation();
  const [history, setHistory] = useState<CookedRecipe[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const stored = localStorage.getItem('cookingHistory');
      if (stored) {
        const historyData = JSON.parse(stored);
        // Sort by timestamp, most recent first
        historyData.sort((a: CookedRecipe, b: CookedRecipe) => b.timestamp - a.timestamp);
        setHistory(historyData);
      }
    };
    loadHistory();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <HistoryIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Cooking History</h1>
              <p className="text-sm text-muted-foreground">
                {history.length} {history.length === 1 ? 'recipe' : 'recipes'} completed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-muted rounded-full mb-4">
              <HistoryIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No cooking history yet</h2>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Complete cooking mode to see your recipes here
            </p>
            <Button onClick={() => setLocation("/")}>
              <ChefHat className="w-4 h-4 mr-2" />
              Start Cooking
            </Button>
          </div>
        ) : (
          history.map((recipe) => (
            <Card
              key={recipe.id}
              className="p-4 hover:shadow-lg transition-all"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">✅</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {recipe.description}
                  </p>
                  
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipe.time}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(recipe.timestamp)}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
