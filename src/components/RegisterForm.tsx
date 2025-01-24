import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white  text-center mb-6">
        Register
      </h2>
      <div className="flex flex-col gap-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
          >
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Enter your name"
          />
        </div>
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

        {/* Terms and Conditions */}
        <div className="flex items-center mt-4">
          <input type="checkbox" className="w-5 h-5" />
          <p className="ml-2 text-gray-800 dark:text-white ">
            I have read and accept the{" "}
            <a href="#" className="underline text-gray-800 dark:text-white">
              Terms of Service & Privacy Policy
            </a>
          </p>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300"
        >
          Register
        </button>
        <div className="flex items-center justify-center text-gray-800 dark:text-white  mt-2">
          <p className="text-gray-800 dark:text-white ">
            Already have an account?
          </p>

          <Link to="/login">
            <button   className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">
              Login
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
