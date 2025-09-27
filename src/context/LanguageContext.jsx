import React, { createContext, useState, useContext } from 'react';

const languages = {
  en: {
    welcome: "Welcome to Digital Tourist ID Platform",
    login: "Login",
    register: "Register",
    home: "Home",
    apply: "Apply for ID",
    verify: "Verify ID",
    status: "Check Status",
    admin: "Admin",
    logout: "Logout",
    // Add more English translations as needed
  },
  hi: {
    welcome: "डिजिटल टूरिस्ट आईडी प्लेटफॉर्म में आपका स्वागत है",
    login: "लॉगिन",
    register: "रजिस्टर",
    home: "होम",
    apply: "आईडी के लिए आवेदन करें",
    verify: "आईडी सत्यापित करें",
    status: "स्थिति जांचें",
    admin: "व्यवस्थापक",
    logout: "लॉगआउट",
    // Add more Hindi translations
  },
  ta: {
    welcome: "டிஜிட்டல் சுற்றுலா ஐடி தளத்திற்கு வரவேற்கிறோம்",
    login: "உள்நுழைய",
    register: "பதிவு செய்ய",
    // Tamil translations
  },
  // Add more Indian languages...
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    return languages[currentLanguage][key] || languages['en'][key] || key;
  };

  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  // Load saved language preference
  React.useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages[savedLang]) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      t, 
      currentLanguage, 
      changeLanguage,
      availableLanguages: Object.keys(languages)
    }}>
      {children}
    </LanguageContext.Provider>
  );
};