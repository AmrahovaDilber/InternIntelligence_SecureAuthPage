import React, { useState } from "react";
import { Link } from "react-router-dom";

interface errorType {
  name?: string;
  email?: string;
  password?: string;
  checked?: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    checked: false,
  });

  const [errors, setErrors] = useState<errorType>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const validationErrors: errorType = {};
    if (!formData.name) {
      validationErrors.name = "Name is required";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.checked) {
      validationErrors.checked = "You must accept the Terms of Service.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
    }
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = e.target;
  
    setFormData((formData) => ({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }));
  
    setErrors((errors) => ({
      ...errors,
      [name]: "",
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
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
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
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            name="checked"
            className="w-5 h-5"
            checked={formData.checked}
            onChange={handleInputChange}
          />
          <p className="ml-2 text-gray-800 dark:text-white">
            I have read and accept the{" "}
            <a href="#" className="underline text-gray-800 dark:text-white">
              Terms of Service & Privacy Policy
            </a>
          </p>
          {errors.checked && (
            <p className="text-red-500 text-sm mt-1">{errors.checked}</p>
          )}
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
            <button className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">
              Login
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
