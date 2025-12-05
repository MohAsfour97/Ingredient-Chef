import { useState } from "react";
import { useLocation } from "wouter";
import { ingredients, Ingredient } from "@/lib/mockData";
import { useAuth } from "@/hooks/useAuth";
import chefAvatar from "@assets/generated_images/cute_3d_robot_chef_character.png";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, ChefHat, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [_, setLocation] = useLocation();
  const { user } = useAuth();

  const toggleIngredient = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredIngredients = ingredients.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(filteredIngredients.map(i => i.category)));

  const handleCook = () => {
    if (selected.length > 0) {
      localStorage.setItem('selectedIngredients', JSON.stringify(selected));
      setLocation("/cooking");
    }
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-32 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

      <header className="pt-6 px-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 overflow-hidden border-2 border-white shadow-sm">
                <img src={chefAvatar} alt="Chef" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-xl font-heading text-foreground leading-tight">
                Hi{user?.firstName ? `, ${user.firstName}` : ''}!
              </h1>
              <span className="text-muted-foreground text-sm">What's cooking today?</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-profile">
                {user?.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-muted-foreground">
                {user?.email || 'Guest'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                <LogOut className="mr-2 w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search ingredients..." 
            className="pl-10 bg-white border-border/50 shadow-sm h-12 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search"
          />
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-250px)] px-6">
        <div className="space-y-6 pb-20">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">{category}</h3>
              <div className="grid grid-cols-3 gap-3">
                {filteredIngredients.filter(i => i.category === category).map(ingredient => {
                  const isSelected = selected.includes(ingredient.id);
                  return (
                    <motion.button
                      key={ingredient.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleIngredient(ingredient.id)}
                      data-testid={`button-ingredient-${ingredient.id}`}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 aspect-square gap-2 relative",
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary" 
                          : "border-transparent bg-white shadow-sm hover:border-border"
                      )}
                    >
                      <span className="text-3xl">{ingredient.emoji}</span>
                      <span className={cn(
                        "text-xs font-medium",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}>
                        {ingredient.name}
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
              <p>No ingredients found matching "{search}"</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto z-50"
          >
            <div className="bg-foreground text-background p-2 rounded-[20px] shadow-xl flex items-center justify-between pl-5 pr-2 gap-4">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-sm font-medium whitespace-nowrap">{selected.length} items selected</span>
                <div className="flex -space-x-2 overflow-hidden">
                  {selected.slice(0, 3).map(id => {
                    const ing = ingredients.find(i => i.id === id);
                    return ing ? (
                      <span key={id} className="inline-flex items-center justify-center w-6 h-6 bg-white/10 rounded-full text-[10px] border border-white/10">
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
                data-testid="button-cook"
              >
                Cook Now <ChefHat className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
