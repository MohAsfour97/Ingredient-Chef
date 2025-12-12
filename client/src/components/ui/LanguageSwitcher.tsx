import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // Sync lang + direction
  useEffect(() => {
    const html = document.documentElement;
    html.lang = i18n.language;
    html.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={toggleLanguage}
        className="
          flex items-center gap-2 px-4 py-2
          rounded-full shadow-lg border border-white/20
          backdrop-blur-md bg-white/20
          text-foreground font-medium
          hover:bg-white/30 transition-all duration-300
        "
      >
        <Globe className="w-4 h-4" />
        <span className="tracking-wide">
          {i18n.language === "en" ? "English" : "العربية"}
        </span>

        {/* Animated Dot */}
        <span
          className={`
            w-2 h-2 rounded-full transition-all duration-300 
            ${i18n.language === "en" ? "bg-blue-500" : "bg-green-500"}
          `}
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
