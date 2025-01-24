import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Register from "./components/Register";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function changeTheme() {
    setIsDarkMode((isDarkMode)=>!isDarkMode);
  }

  return (
    <div className="bg-gray-100 dark:bg-[#121212] w-full h-[100vh]">
      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-0">
        <Header changeTheme={changeTheme} isDarkMode={isDarkMode}></Header>
        <Register></Register>
      </div>
    </div>
  );
};

export default App;
