import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useMainContext } from "../context/MainContext";
import { notification } from "../lib/helper";

interface FormDataType {
  name: string;
  email: string;
  password: string;
  checked: boolean;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  country?: string;
}

interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
  checked?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  country?: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    checked: false,
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    country: "",
  });
  const { setUserInfo } = useMainContext();

  const [errors, setErrors] = useState<ErrorType>({});
  const [isRegistering, setIsRegistering] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): ErrorType => {
    const validationErrors: ErrorType = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.checked) {
      validationErrors.checked = "You must accept the Terms of Service.";
    }

    // Optional validations for new fields
    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      validationErrors.phone = "Invalid phone number.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsRegistering(true);
        const userCredential = await doCreateUserWithEmailAndPassword(
          formData.email,
          formData.password
        );

        const userId = userCredential.user.uid;

        // Save user data to Firestore
        await setDoc(doc(db, "users", userId), {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          acceptedTerms: formData.checked,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
     
          country: formData.country,
        });
        setUserInfo({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
         
          country: formData.country,
        });
        notification("Successfully Registered");
        navigate("/login");
      } catch (err) {
        console.error("Error during registration:", err);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto bg-white p-8 w-full mx-auto shadow-xl backdrop-blur-sm dark:bg-[#1E1E1E] bg-gray-100/50 rounded-2xl"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Register
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
              errors.name
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 dark:text-white`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
  
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
              errors.email
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 dark:text-white`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
  
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
              errors.password
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 dark:text-white`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
  
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
  
        {/* Date of Birth Field */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>
  
        {/* Gender Field */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
  
      
  
        {/* Country Field */}
        <div className="col-span-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
            placeholder="Enter your country"
          />
        </div>
  
        {/* Checkbox */}
        <div className="col-span-2 flex items-center my-3">
          <input
            type="checkbox"
            name="checked"
            className="w-5 h-5"
            checked={formData.checked}
            onChange={handleInputChange}
          />
          <p className="ml-2 dark:text-gray-300">
            I accept the{" "}
            <a href="#" className="underline">
              Terms of Service & Privacy Policy
            </a>
          </p>
        </div>
        {errors.checked && (
          <div className="col-span-2">
            <p className="text-red-500 text-sm mt-1">{errors.checked}</p>
          </div>
        )}
  
        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={isRegistering}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all"
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </div>
  
        <div className="col-span-2 flex justify-center mt-2">
          <p className="dark:text-gray-300">Already have an account?</p>
          <Link to="/login">
            <button className="ml-1 font-semibold text-purple-600 dark:text-purple-400 hover:underline">
              Login
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;