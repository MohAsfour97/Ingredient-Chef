import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import Welcome from "@/pages/Welcome";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import Cooking from "@/pages/Cooking";
import Results from "@/pages/Results";
import Recipe from "@/pages/Recipe";
import CookingMode from "@/pages/CookingMode";
import Favorites from "@/pages/Favorites";
import History from "@/pages/History";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const [location, setLocation] = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/signin");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/welcome" component={Welcome} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/">
        {() => <ProtectedRoute component={Home} />}
      </Route>
      <Route path="/cooking">
        {() => <ProtectedRoute component={Cooking} />}
      </Route>
      <Route path="/results">
        {() => <ProtectedRoute component={Results} />}
      </Route>
      <Route path="/recipe/:id">
        {() => <ProtectedRoute component={Recipe} />}
      </Route>
      <Route path="/cooking-mode">
        {() => <ProtectedRoute component={CookingMode} />}
      </Route>
      <Route path="/favorites">
        {() => <ProtectedRoute component={Favorites} />}
      </Route>
      <Route path="/history">
        {() => <ProtectedRoute component={History} />}
      </Route>
      <Route path="/profile">
        {() => <ProtectedRoute component={Profile} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location, setLocation] = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const welcomeSeen = localStorage.getItem("welcomeSeen");
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

      if (!welcomeSeen) {
        localStorage.setItem("welcomeSeen", "true");
        setLocation("/welcome");
      } else if (!isAuthenticated && location === "/") {
        setLocation("/signin");
      }

      setInitialized(true);
    }
  }, [initialized, location, setLocation]);

  // Footer should not show on Welcome, SignIn, SignUp
  const showFooter = !["/welcome", "/signin", "/signup"].includes(location);

  // LanguageSwitcher should show on SignIn and SignUp (and optionally others)
  const showLanguageSwitcher = ["/signin", "/signup"].includes(location);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased pb-20">

      {/* Language Switcher */}
      {showLanguageSwitcher && (
        <div className="px-6 pt-4">
          <LanguageSwitcher />
        </div>
      )}

      {/* Main Router */}
      <Router />

      {/* Footer */}
      {showFooter && <Footer />}

      {/* Toaster */}
      <Toaster />
    </div>
  );
}

export default App;
