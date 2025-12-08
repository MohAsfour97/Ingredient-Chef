
import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

export default function Welcome() {
  const [_, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/signin");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="mb-8 inline-block"
        >
          <div className="w-32 h-32 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl">
            <ChefHat className="w-16 h-16 text-primary-foreground" />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-heading font-bold text-foreground mb-3"
        >
          Chef's Kiss
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground"
        >
          Your AI Cooking Companion
        </motion.p>
      </motion.div>
    </div>
  );
}
