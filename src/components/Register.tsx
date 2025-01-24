import img from "../assets/images/register.png";
import RegisterForm from "./RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="w-full mt-10 flex flex-col md:flex-row justify-center items-center md:justify-between mx-auto  md:space-y-0 ">
      {/* Left Section */}
      <div className="w-full md:w-1/2 lg:w-1/2  h-[300px]  md:h-[500px] bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-300 relative shadow-lg overflow-hidden flex justify-center items-center rounded-xl">
        <img
          src={img}
          className="absolute top-[-60px] md:top-[-100px] lg:top-[-140px] left-[-40px] md:left-[-20px] lg:left-0 w-[300px] md:w-[450px] lg:w-[600px] object-contain"
          alt="Register Visual"
        />
        <div className="absolute bottom-12 md:bottom-20 lg:bottom-44 left-4 md:left-6 lg:left-8 text-[#E0E0E0] max-w-[85%]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Nice to Meet You!
          </h2>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed">
            Just register to join us and start your journey today. Let's grow
            together!
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 lg:w-1/2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
