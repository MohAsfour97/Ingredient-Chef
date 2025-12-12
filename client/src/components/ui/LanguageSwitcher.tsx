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
    <div style={styles.container}>
      <button
        onClick={() => changeLanguage("en")}
        style={{
          ...styles.button,
          ...(i18n.language === "en" ? styles.activeButton : {}),
        }}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("ar")}
        style={{
          ...styles.button,
          ...(i18n.language === "ar" ? styles.activeButton : {}),
        }}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageSwitcher;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  button: {
    padding: "6px 14px",
    borderRadius: "8px",
    background: "#f0f0f0",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontWeight: 500,
  },
  activeButton: {
    background: "#4A90E2",
    color: "white",
    borderColor: "#4A90E2",
  },
};
