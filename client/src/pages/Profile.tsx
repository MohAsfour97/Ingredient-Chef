
import { User, Settings, LogOut, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: "Chef User",
    email: "chef@example.com",
    joinDate: "January 2024",
    recipesCreated: 24,
    favoriteRecipes: 12,
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-24">
      <div className="relative h-32 bg-gradient-to-br from-primary/30 to-secondary/30">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-background" />
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-muted-foreground flex items-center gap-1 mt-1">
            <Mail className="w-4 h-4" />
            {user.email}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Calendar className="w-4 h-4" />
            Joined {user.joinDate}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{user.recipesCreated}</p>
            <p className="text-sm text-muted-foreground mt-1">Recipes Created</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{user.favoriteRecipes}</p>
            <p className="text-sm text-muted-foreground mt-1">Favorites</p>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-3">Settings</h2>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <User className="w-5 h-5 mr-3" />
            Edit Profile
          </Button>

          <Button variant="outline" className="w-full justify-start" size="lg">
            <Settings className="w-5 h-5 mr-3" />
            Preferences
          </Button>

          <Separator className="my-4" />

          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive" 
            size="lg"
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("userEmail");
              localStorage.removeItem("userName");
              localStorage.removeItem("isGuest");
              window.location.href = "/signin";
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
