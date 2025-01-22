import DarkMode from "./DarkMode";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <Logo></Logo>
      <div className=" flex items-center space-x-4">
        <NavLinks></NavLinks>
        <DarkMode></DarkMode>
      </div>
    </div>
  );
};

export default Header;
