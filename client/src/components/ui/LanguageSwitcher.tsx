import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // Sync HTML lang & direction whenever language changes
  useEffect(() => {
    const html = document.documentElement;
    html.lang = i18n.language;
    html.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const languages = ["en", "ar"];

  return (
    <div className="flex justify-end p-2">
      <div className="relative w-32 h-12 bg-gray-200 rounded-full flex items-center shadow-inner cursor-pointer select-none">
        {/* Sliding pill */}
        <div
          className={`absolute top-1 left-1 w-14 h-10 bg-blue-600 rounded-full shadow-lg transform transition-transform duration-400 ease-out ${
            i18n.language === "ar" ? "translate-x-16" : ""
          }`}
        />

        {languages.map((lng) => (
          <button
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            aria-label={`Switch to ${lng === "en" ? "English" : "Arabic"}`}
            className={`flex-1 h-full text-sm font-semibold z-10 relative focus:outline-none transition-colors duration-200 ${
              i18n.language === lng ? "text-white" : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
