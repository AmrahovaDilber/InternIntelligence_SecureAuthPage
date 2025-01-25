import logo from "../assets/images/logo.png";

const Logo: React.FC = () => {
  return (
    <a href="/" className="flex items-center space-x-3 sm:space-x-4 md:space-x-5">
      <figure className="w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-indigo-500 p-1 shadow-lg transform group-hover:scale-110 transition duration-300 ease-in-out">
        <img
          src={logo}
          alt="logo"
          className="object-cover w-full h-full rounded-full"
        />
      </figure>
      <p className="font-bold text-[20px] sm:text-[24px] md:text-[26px] text-gray-900 dark:text-[#E0E0E0]">
        SecureAuth
      </p>
    </a>
  );
};

export default Logo;
