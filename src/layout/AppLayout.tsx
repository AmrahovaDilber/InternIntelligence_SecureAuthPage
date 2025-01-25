import React, { ReactNode, useEffect, useState } from "react";
import Header from "../components/Header";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }


    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  function changeTheme() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  // useEffect(() => {
  //   const loader = document.getElementById("loader");
  //   if (loader) {
  //     loader.classList.add("hidden");
  //   }
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212]">
      <div className="w-full mx-auto">
        <Header isDarkMode={isDarkMode} changeTheme={changeTheme} />
        <main className="flex-1 w-full py-6 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
