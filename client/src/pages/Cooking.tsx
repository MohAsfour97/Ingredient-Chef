import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import chefAvatar from "@assets/generated_images/cute_3d_robot_chef_character.png";
import { ingredients } from "@/lib/mockData";
import { generateRecipes } from "@/lib/api";

const cookingSteps = [
  "Analyzing flavors...",
  "Chopping ingredients...",
  "Sautéing to perfection...",
  "Adding a pinch of love...",
  "Plating your dish..."
];

export default function Cooking() {
  const [_, setLocation] = useLocation();
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < cookingSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    const generateRecipesAsync = async () => {
      try {
        const stored = localStorage.getItem('selectedIngredients');
        if (!stored) {
          setLocation("/");
          return;
        }

        const selectedIds = JSON.parse(stored);
        const selectedIngredients = ingredients.filter(i => selectedIds.includes(i.id));
        const ingredientNames = selectedIngredients.map(i => i.name);

        const recipes = await generateRecipes(ingredientNames);
        
        localStorage.setItem('generatedRecipes', JSON.stringify(recipes));
        
        setTimeout(() => {
          setLocation("/results");
        }, 1000);
      } catch (err) {
        console.error("Error generating recipes:", err);
        setError(err instanceof Error ? err.message : "Failed to generate recipes");
        
        setTimeout(() => {
          setLocation("/");
        }, 3000);
      }
    };

    generateRecipesAsync();

    return () => {
      clearInterval(interval);
    };
  }, [setLocation]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center max-w-md mx-auto p-6 text-center">
        <div className="text-red-500 mb-4 text-lg font-medium">{error}</div>
        <p className="text-muted-foreground">Redirecting you back...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center max-w-md mx-auto p-6 text-center relative overflow-hidden">
       <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" 
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 relative"
      >
        <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center p-1 border-4 border-primary/10 z-10 relative">
           <img src={chefAvatar} alt="Chef" className="w-full h-full object-cover rounded-full" />
        </div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20px] border border-dashed border-primary/30 rounded-full z-0"
        />
        <motion.span 
          animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          className="absolute -top-4 right-0 text-2xl"
        >✨</motion.span>
        <motion.span 
          animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-0 -left-4 text-2xl"
        >🍳</motion.span>
        <motion.span 
          animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-2 right-10 text-2xl"
        >🧂</motion.span>
      </motion.div>

      <h2 className="text-2xl font-heading font-bold mb-2">Chef is working...</h2>
      
      <div className="h-8 overflow-hidden relative w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-muted-foreground absolute w-full left-0"
          >
            {cookingSteps[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 w-48 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </div>
  );
}
