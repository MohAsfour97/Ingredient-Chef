import { Switch, Route } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Cooking from "@/pages/Cooking";
import Results from "@/pages/Results";
import Recipe from "@/pages/Recipe";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/cooking" component={Cooking} />
          <Route path="/results" component={Results} />
          <Route path="/recipe/:id" component={Recipe} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Router />
      <Toaster />
    </div>
  );
}

export default App;
