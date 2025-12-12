import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // Sync HTML lang & direction whenever i18n.language changes
  useEffect(() => {
    const html = document.documentElement;
    html.lang = i18n.language;
    html.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <div className="flex justify-end p-2">
      <div className="relative w-28 h-10 bg-gray-200 rounded-full flex items-center cursor-pointer select-none shadow-inner">
        {/* Sliding indicator */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-blue-600 rounded-full shadow-md transform transition-transform duration-300 ${
            i18n.language === "ar" ? "translate-x-full" : ""
          }`}
        />

        {/* EN button */}
        <button
          className={`w-1/2 h-full text-sm font-semibold z-10 ${
            i18n.language === "en" ? "text-white" : "text-gray-700"
          }`}
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </button>

        {/* AR button */}
        <button
          className={`w-1/2 h-full text-sm font-semibold z-10 ${
            i18n.language === "ar" ? "text-white" : "text-gray-700"
          }`}
          onClick={() => i18n.changeLanguage("ar")}
        >
          AR
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
