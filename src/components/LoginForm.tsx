import { useState } from "react";
import { Link } from "react-router-dom";
import google from "../assets/images/google.png";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto bg-white p-8  w-full mx-auto shadow-xl backdrop-blur-sm dark:bg-[#1E1E1E] bg-gray-100/50 rounded-2xl"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Login to Your Account
      </h2>
      <div className="flex flex-col gap-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mt-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-600 dark:text-gray-300">
              Remember Me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center ">
          <span className="h-[1px] w-full bg-gray-300 dark:bg-gray-600"></span>
          <p className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</p>
          <span className="h-[1px] w-full bg-gray-300 dark:bg-gray-600"></span>
        </div>

        {/* Google Login */}
        <div className="flex items-center justify-center border border-gray-300 dark:border-gray-600 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
          <figure className="w-[24px] h-[24px] mr-3">
            <img
              src={google}
              alt="Google logo"
              className="w-full h-full object-contain"
            />
          </figure>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Continue with Google
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
