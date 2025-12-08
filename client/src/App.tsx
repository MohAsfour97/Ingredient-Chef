import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Cooking from "@/pages/Cooking";
import Results from "@/pages/Results";
import Recipe from "@/pages/Recipe";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cooking" component={Cooking} />
      <Route path="/results" component={Results} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased pb-20">
      <Router />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
