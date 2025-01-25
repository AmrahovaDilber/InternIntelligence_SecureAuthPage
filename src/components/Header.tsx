import { IoPerson } from "react-icons/io5";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { useMainContext } from "../context/MainContext";
import { doSignOut } from "../firebase/auth";
import { notification } from "../lib/helper";

interface HeaderProps {
  changeTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ changeTheme, isDarkMode }) => {
  const { userLoggedIn } = useMainContext();

  return (
    <header className="  bg-white dark:bg-[#1E1E1E] shadow-md">
      <div className="max-w-[1200px] mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {userLoggedIn ? (
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-300">
            Welcome!
          </p>
        ) : (
          <Logo />
        )}

        <div className="flex items-center space-x-6">
          {!userLoggedIn && <NavLinks />}

          <DarkMode changeTheme={changeTheme} isDarkMode={isDarkMode} />

          {userLoggedIn && (
            <div className="flex items-center space-x-2">
              <IoPerson className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <button
                onClick={() => {
                  doSignOut();
                  notification("You have successfully signed out!");
                }}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
