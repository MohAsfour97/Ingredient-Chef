
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { GeneratedRecipe } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Play, Pause, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

export default function CookingMode() {
  const [_, setLocation] = useLocation();
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isStepComplete, setIsStepComplete] = useState(false);

  // Parse time from step text (looks for patterns like "5 minutes", "2-3 minutes", etc.)
  const parseStepTime = (stepText: string): number => {
    const timeMatch = stepText.match(/(\d+)(?:-\d+)?\s*(minute|min|second|sec)/i);
    if (timeMatch) {
      const value = parseInt(timeMatch[1]);
      const unit = timeMatch[2].toLowerCase();
      if (unit.includes('min')) {
        return value * 60; // Convert to seconds
      }
      return value;
    }
    // Default time if no time found in step
    return 60;
  };

  useEffect(() => {
    const stored = localStorage.getItem('currentRecipe');
    if (stored) {
      const recipeData = JSON.parse(stored);
      setRecipe(recipeData);
      setTimeRemaining(parseStepTime(recipeData.steps[0]));
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsStepComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemaining]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    if (recipe) {
      setTimeRemaining(parseStepTime(recipe.steps[currentStep]));
      setIsTimerRunning(false);
      setIsStepComplete(false);
    }
  };

  const handleNextStep = () => {
    if (recipe && currentStep < recipe.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeRemaining(parseStepTime(recipe.steps[nextStep]));
      setIsTimerRunning(false);
      setIsStepComplete(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (recipe) {
        setTimeRemaining(parseStepTime(recipe.steps[prevStep]));
      }
      setIsTimerRunning(false);
      setIsStepComplete(false);
    }
  };

  const handleFinish = () => {
    if (recipe) {
      // Save to cooking history
      const history = JSON.parse(localStorage.getItem('cookingHistory') || '[]');
      const cookedRecipe = {
        id: Date.now().toString(),
        name: recipe.name,
        description: recipe.description,
        time: recipe.time,
        cookedDate: new Date().toLocaleDateString(),
        timestamp: Date.now(),
      };
      history.push(cookedRecipe);
      localStorage.setItem('cookingHistory', JSON.stringify(history));
    }
    setLocation("/results");
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!recipe) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Recipe not found</p>
        <Button onClick={() => setLocation("/results")}>Go Back</Button>
      </div>
    );
  }

  const progress = ((currentStep + 1) / recipe.steps.length) * 100;
  const isLastStep = currentStep === recipe.steps.length - 1;

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col pb-20">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation(`/recipe/${recipe.name}`)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold">Cooking Mode</h2>
          <div className="w-9" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {recipe.steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-2xl mb-4">
                {currentStep + 1}
              </div>
              <p className="text-lg leading-relaxed text-foreground px-4">
                {recipe.steps[currentStep]}
              </p>
            </div>

            {/* Timer Circle */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary transition-all duration-1000"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - timeRemaining / parseStepTime(recipe.steps[currentStep]))}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-foreground font-mono">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {isTimerRunning ? 'Running' : isStepComplete ? 'Complete!' : 'Ready'}
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
                onClick={handleResetTimer}
                disabled={timeRemaining === parseStepTime(recipe.steps[currentStep])}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              
              {!isTimerRunning ? (
                <Button
                  size="icon"
                  className="rounded-full w-16 h-16 shadow-lg"
                  onClick={handleStartTimer}
                  disabled={timeRemaining === 0}
                >
                  <Play className="w-6 h-6 ml-1" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  className="rounded-full w-16 h-16 shadow-lg"
                  onClick={handlePauseTimer}
                >
                  <Pause className="w-6 h-6" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-6 space-y-3">
        {isStepComplete && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 font-medium">
              <Check className="w-5 h-5" />
              Step Complete!
            </div>
          </motion.div>
        )}

        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl"
              onClick={handlePreviousStep}
            >
              Previous
            </Button>
          )}
          
          {!isLastStep ? (
            <Button
              className="flex-1 h-12 rounded-xl font-bold"
              onClick={handleNextStep}
            >
              Proceed to Next Step
            </Button>
          ) : (
            <Button
              className="flex-1 h-12 rounded-xl font-bold bg-green-600 hover:bg-green-700"
              onClick={handleFinish}
            >
              <Check className="w-5 h-5 mr-2" />
              Finish Cooking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
