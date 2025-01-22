import React from "react";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 w-full h-[100vh]">
      <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-0">
        <Header></Header>
      </div>
    </div>
  );
};

export default App;
