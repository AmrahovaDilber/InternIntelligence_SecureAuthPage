import { IoMoon } from "react-icons/io5";

const DarkMode: React.FC = () => {
    return (
      <div className="w-[87px] h-[40px] rounded-full relative bg-gradient-to-r from-gray-800 via-gray-900 to-black  backdrop-blur-lg bg-opacity-70 shadow-lg flex items-center justify-between px-4">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-200 flex items-center justify-center shadow-inner absolute top-[5px] left-[5px] transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
        <IoMoon className="w-[20px] h-[20px] object-cover text-yellow-500" />
        </div>
      
        <div className="w-[30px] h-[30px] bg-gray-700 rounded-full absolute top-[10px] right-[10px]"></div>
        <div className="w-[10px] h-[10px] bg-gray-600 rounded-full absolute top-[50%] right-[40px] transform translate-y-[-50%]"></div>
      </div>
    );
  };
  
  export default DarkMode;
  