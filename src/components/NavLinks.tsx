import { Link } from "react-router-dom";

const NavLinks: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
      <Link to="/login" className="w-full md:w-auto">
        <button className="text-[#651FFF] bg-[#D1C4E9] w-full md:w-auto px-5 text-[16px] py-[6px] text-center rounded-lg cursor-pointer">
          Login
        </button>
      </Link>
      <Link to="/" className="w-full md:w-auto">
        <button className="text-[#651FFF] bg-[#D1C4E9] w-full md:w-auto px-5 text-[16px] py-[6px] text-center rounded-lg cursor-pointer">
          Register
        </button>
      </Link>
    </div>
  );
};

export default NavLinks;