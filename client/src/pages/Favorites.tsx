import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Heart, Clock, Flame, ChefHat, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface FavoriteRecipe {
  id: string;
  name: string;
  description: string;
  time: string;
  calories: string;
  difficulty: "Easy" | "Medium" | "Hard";
  savedDate: string;
}

export default function Favorites() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Hard":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t("favorites.title")}</h1>
              <p className="text-sm text-muted-foreground">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? t("favorites.recipe")
                  : t("favorites.recipesSaved")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-muted rounded-full mb-4">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{t("favorites.noFavorites")}</h2>
            <p className="text-muted-foreground mb-6 max-w-xs">
              {t("favorites.noFavoritesSubtitle")}
            </p>
            <Button onClick={() => setLocation("/")}>
              <ChefHat className="w-4 h-4 mr-2" />
              {t("favorites.discoverRecipes")}
            </Button>
          </div>
        ) : (
          favorites.map((recipe) => (
            <Card
              key={recipe.id}
              className="p-4 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex gap-4">
                <div
                  className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    if ((recipe as any).fullRecipe) {
                      localStorage.setItem(
                        "currentRecipe",
                        JSON.stringify((recipe as any).fullRecipe)
                      );
                      setLocation(`/recipe/${recipe.id}`);
                    }
                  }}
                >
                  <span className="text-3xl">🍽️</span>
                </div>

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    if ((recipe as any).fullRecipe) {
                      localStorage.setItem(
                        "currentRecipe",
                        JSON.stringify((recipe as any).fullRecipe)
                      );
                      setLocation(`/recipe/${recipe.id}`);
                    }
                  }}
                >
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {recipe.description}
                  </p>

                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipe.time}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Flame className="w-3 h-3 mr-1" />
                      {recipe.calories}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(recipe.difficulty)}`}>
                      {t(`favorites.difficulty.${recipe.difficulty}`)}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {t("favorites.savedOn")} {recipe.savedDate}
                  </p>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(recipe.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
      }
