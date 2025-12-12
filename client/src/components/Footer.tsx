import { useLocation } from "wouter";
import { Home, Heart, User, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const [location, setLocation] = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: "/", icon: Home, label: t("footer.home") },
    { path: "/favorites", icon: Heart, label: t("footer.favorites") },
    { path: "/history", icon: History, label: t("footer.history") },
    { path: "/profile", icon: User, label: t("footer.profile") },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <nav className="max-w-md mx-auto px-6 py-3">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <button
                  onClick={() => setLocation(item.path)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive && "fill-primary")} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
                }
