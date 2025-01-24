import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} className=" h-[500px] bg-white p-8  max-w-full w-full backdrop-blur-sm dark:bg-[#262525] bg-gray-500/40 rounded-xl" >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-[#FAFAFA] text-center mb-6">
        Register
      </h2>
      <div className="flex flex-col gap-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-[#FAFAFA] mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-[#FAFAFA] mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-[#FAFAFA] mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter your password"
          />
              </div>
              <div className="flex items-center space-x-2 dark:text-[#FAFAFA]">
                  <p >Already have an account?</p>
                  <button>Login</button>
              </div>
             

        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" className=""></input>
          <p className="dark:text-[#FAFAFA]">
            I have read and accept the Terms of{" "}
            <a href="#">Service & Privacy Policy *</a>
          </p>
              </div>
              

     
        <button
          type="submit"
          className="mt-4w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
