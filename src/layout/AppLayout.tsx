import React, { ReactNode, useEffect, useState } from "react";
import Header from "../components/Header";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function changeTheme() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212]">
      <div className=" w-full mx-auto ">
        <Header isDarkMode={isDarkMode} changeTheme={changeTheme} />  
        <main className="flex-1 w-full py-6 max-w-[1200px] mx-auto px-4  sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
  
};

export default AppLayout;
