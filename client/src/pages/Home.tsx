import { useState } from "react";
import { useLocation } from "wouter";
import { ingredients, Ingredient } from "@/lib/mockData";
import chefAvatar from "@assets/generated_images/cute_3d_robot_chef_character.png";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, ChefHat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [_, setLocation] = useLocation();

  const toggleIngredient = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Filter ingredients based on search
  const filteredIngredients = ingredients.filter(i =>
    t(`ingredients.${i.id}`).toLowerCase().includes(search.toLowerCase())
  );

  // Get unique categories from filtered ingredients
  const categories = Array.from(
    new Set(filteredIngredients.map(i => i.category))
  );

  const handleCook = () => {
    if (selected.length > 0) {
      localStorage.setItem("selectedIngredients", JSON.stringify(selected));
      setLocation("/cooking");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-32 relative overflow-hidden">

      {/* Decorative Background Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <header className="pt-8 px-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 overflow-hidden border-2 border-white shadow-sm">
              <img src={chefAvatar} alt="Chef" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
          </div>

          <div>
            <h1 className="text-2xl font-heading text-foreground leading-tight">
              {t("home.greeting")} <br />
              <span className="text-muted-foreground text-lg font-normal">
                {t("home.subtitle")}
              </span>
            </h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("home.searchPlaceholder")}
            className="pl-10 bg-white border-border/50 shadow-sm h-12 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Ingredients Grid */}
      <ScrollArea className="h-[calc(100vh-250px)] px-6">
        <div className="space-y-6 pb-20">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                {t(`categories.${category}`)}
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {filteredIngredients
                  .filter(i => i.category === category)
                  .map(ingredient => {
                    const isSelected = selected.includes(ingredient.id);

                    return (
                      <motion.button
                        key={ingredient.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleIngredient(ingredient.id)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 aspect-square gap-2",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary"
                            : "border-transparent bg-white shadow-sm hover:border-border"
                        )}
                      >
                        <span className="text-3xl">{ingredient.emoji}</span>

                        <span
                          className={cn(
                            "text-xs font-medium",
                            isSelected ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {t(`ingredients.${ingredient.id}`)}
                        </span>

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                        )}
                      </motion.button>
                    );
                  })}
              </div>
            </div>
          ))}

          {filteredIngredients.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>
                {t("home.noIngredientsFound")} "{search}"
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Bottom Floating Action Bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-0 right-0 px-6 max-w-md mx-auto z-50"
          >
            <div className="bg-foreground text-background p-2 rounded-[20px] shadow-xl flex items-center justify-between pl-5 pr-2 gap-4">

              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-sm font-medium whitespace-nowrap">
                  {t("home.itemsSelected", { count: selected.length })}
                </span>

                <div className="flex -space-x-2 overflow-hidden">
                  {selected.slice(0, 3).map(id => {
                    const ing = ingredients.find(i => i.id === id);
                    return ing ? (
                      <span
                        key={id}
                        className="inline-flex items-center justify-center w-6 h-6 bg-white/10 rounded-full text-[10px] border border-white/10"
                      >
                        {ing.emoji}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <Button
                onClick={handleCook}
                size="lg"
                className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 shadow-lg shadow-primary/20"
              >
                {t("home.cookNow")}{" "}
                <ChefHat className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
              }
