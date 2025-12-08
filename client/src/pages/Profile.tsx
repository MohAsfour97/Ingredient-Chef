
import { useState, useEffect, useRef } from "react";
import { User, Settings, LogOut, Mail, Calendar, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [recipesCooked, setRecipesCooked] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load profile photo
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }

    // Load cooking history count
    const history = JSON.parse(localStorage.getItem('cookingHistory') || '[]');
    setRecipesCooked(history.length);

    // Load favorites count
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteCount(favorites.length);
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePhoto(result);
        localStorage.setItem('profilePhoto', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const user = {
    name: localStorage.getItem('userName') || "Chef User",
    email: localStorage.getItem('userEmail') || "chef@example.com",
    joinDate: "January 2024",
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-24">
      <div className="relative h-32 bg-gradient-to-br from-primary/30 to-secondary/30">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-background" />
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold border-4 border-background shadow-lg overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-2 border-background hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
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
            <p className="text-3xl font-bold text-primary">{recipesCooked}</p>
            <p className="text-sm text-muted-foreground mt-1">Recipes Cooked</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{favoriteCount}</p>
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
