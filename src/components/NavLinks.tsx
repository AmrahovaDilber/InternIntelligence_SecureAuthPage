const NavLinks: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <button className="text-[#651FFF] bg-[#D1C4E9] w-full px-5 text-[16px] py-[6px] text-center rounded-lg cursor-pointer">
        Login
      </button>
      <button className="text-[#651FFF] bg-[#D1C4E9] w-full px-5 text-[16px] py-[6px] text-center rounded-lg cursor-pointer">
        Register
      </button>
    </div>
  );
};

export default NavLinks;
