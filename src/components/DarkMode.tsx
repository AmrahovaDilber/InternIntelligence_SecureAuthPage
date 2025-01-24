import { FaSun } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";

interface DarkModeProps {
  changeTheme: () => void;
  isDarkMode: boolean;
}

const DarkMode: React.FC<DarkModeProps> = ({ changeTheme, isDarkMode }) => {
  return (
    <div
      onClick={changeTheme}
      className="w-[87px] h-[40px] rounded-full relative bg-gradient-to-r from-gray-700 via-gray-800 to-black backdrop-blur-lg shadow-lg flex items-center px-2 cursor-pointer transition-all duration-300 ease-in-out"
    >
      {/* Toggle Indicator */}
      <div
        className={`w-[30px] h-[30px] rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center shadow-inner transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-[45px]" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
           <FaSun
           className={`w-[20px] h-[20px] text-yellow-500 dark:text-yellow-400`}
         />
        ) : (
          <IoMoon
          className={`w-[20px] h-[20px] text-yellow-500 dark:text-yellow-400`}
        />
        )}
      
      </div>
    </div>
  );
};

export default DarkMode;
