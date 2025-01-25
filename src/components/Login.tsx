import img from "../assets/images/register.png";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {

  return (
    <div className="w-full my-6 flex flex-col md:flex-row justify-center items-stretch md:justify-between mx-auto   max-w-[1100px]">
      {/* Left Section */}
      <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-300 relative shadow-lg overflow-hidden rounded-xl">
        <div className="relative flex items-center justify-center w-full h-full">
          <img
            src={img}
            className="absolute top-0 left-0 w-auto h-full object-contain"
            alt="Register Visual"
          />
          <div className="absolute bottom-12 md:bottom-20 lg:bottom-44 left-4 md:left-6 lg:left-8 text-[#E0E0E0] max-w-[85%]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Welcome back
            </h2>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed">
              Please login to continue!
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 lg:w-1/2 ">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
