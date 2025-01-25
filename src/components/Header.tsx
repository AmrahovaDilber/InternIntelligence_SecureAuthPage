import { IoPerson } from "react-icons/io5";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { useMainContext } from "../context/MainContext";
import { doSignOut } from "../firebase/auth";

interface HeaderProps {
  changeTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ changeTheme, isDarkMode }) => {
  const { userLoggedIn } = useMainContext();
  return (
    <div className="flex items-center justify-between py-4">
      {userLoggedIn ? <p className="text-2xl font-bold dark:text-gray-300">Welcome User!</p> : (
        <Logo></Logo>
      )}
      
      <div className=" flex items-center space-x-4">
        {!userLoggedIn && (     <NavLinks></NavLinks>)}
   
        <DarkMode changeTheme={changeTheme} isDarkMode={isDarkMode}></DarkMode>
        {userLoggedIn && (
          <div>
            <IoPerson className="w-[26px] h-[26px] dark:text-[#FAFAFA]" />
            <button onClick={() => doSignOut()}>Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
