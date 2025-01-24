import DarkMode from "./DarkMode";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

interface HeaderProps{
  changeTheme:()=>void
}

const Header: React.FC<HeaderProps> = ({changeTheme,isDarkMode}) => {
  return (
    <div className="flex items-center justify-between py-4">
      <Logo ></Logo>
      <div className=" flex items-center space-x-4">
        <NavLinks></NavLinks>
        <DarkMode changeTheme={changeTheme} isDarkMode={isDarkMode}></DarkMode>
      </div>
    </div>
  );
};

export default Header;
