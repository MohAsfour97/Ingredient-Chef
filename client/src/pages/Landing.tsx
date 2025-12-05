import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import chefAvatar from "@assets/generated_images/cute_3d_robot_chef_character.png";
import { ChefHat, Sparkles, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden max-w-md mx-auto">
      <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-secondary/30 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative mb-8 inline-block">
          <div className="w-36 h-36 rounded-full bg-white shadow-2xl flex items-center justify-center p-2 border-4 border-primary/10 mx-auto">
            <img src={chefAvatar} alt="AI Chef" className="w-full h-full object-cover rounded-full" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-16px] border-2 border-dashed border-primary/20 rounded-full"
          />
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-3xl"
          >
            ✨
          </motion.span>
        </div>

        <h1 className="text-4xl font-heading font-bold text-foreground mb-4 leading-tight">
          AI Chef
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-xs mx-auto leading-relaxed">
          Pick ingredients from your kitchen and let AI create delicious recipes just for you.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          <Button 
            size="lg" 
            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 group"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-login"
          >
            <Sparkles className="mr-2 w-5 h-5" />
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Sign in with Google, Apple, or Email
          </p>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-3">
            <div className="text-3xl mb-2">🥗</div>
            <p className="text-xs text-muted-foreground">Pick Ingredients</p>
          </div>
          <div className="p-3">
            <div className="text-3xl mb-2">🤖</div>
            <p className="text-xs text-muted-foreground">AI Creates Recipes</p>
          </div>
          <div className="p-3">
            <div className="text-3xl mb-2">🍽️</div>
            <p className="text-xs text-muted-foreground">Cook & Enjoy</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
