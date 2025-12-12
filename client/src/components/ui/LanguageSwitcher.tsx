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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-end gap-2 p-2">
      <div className="relative bg-gray-200 dark:bg-gray-700 rounded-full w-36 h-10 flex items-center px-1">
        {/* Toggle highlight */}
        <div
          className={`absolute top-1 left-1 w-1/2 h-8 bg-primary rounded-full shadow-md transform transition-transform duration-300 ${
            i18n.language === "ar" ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>

        {/* EN button */}
        <button
          onClick={() => changeLanguage("en")}
          className={`w-1/2 h-10 rounded-full text-sm font-medium transition-colors duration-300 ${
            i18n.language === "en" ? "text-white" : "text-gray-700 dark:text-gray-200"
          }`}
        >
          EN
        </button>

        {/* AR button */}
        <button
          onClick={() => changeLanguage("ar")}
          className={`w-1/2 h-10 rounded-full text-sm font-medium transition-colors duration-300 ${
            i18n.language === "ar" ? "text-white" : "text-gray-700 dark:text-gray-200"
          }`}
        >
          AR
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
