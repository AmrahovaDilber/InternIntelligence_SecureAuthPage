import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/images/google.png";
import { useMainContext } from "../context/MainContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useMainContext();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(formData.email, formData.password);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSigningIn(false);
      }
    }

    const validationErrors: { email?: string; password?: string } = {};

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

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
    }
  };

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        navigate("/user");
      } catch (err) {
        console.error(err);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));

    setErrors((errors) => ({
      ...errors,
      [name]: "",
    }));
  };

  if (userLoggedIn) {
    navigate("/user");
    return null;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="h-auto bg-white p-8 w-full mx-auto shadow-xl backdrop-blur-sm dark:bg-[#1E1E1E] bg-gray-100/50 rounded-2xl"
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
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Login"}
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
          <div className="flex items-center justify-center">
            <span className="h-[1px] w-full bg-gray-300 dark:bg-gray-600"></span>
            <p className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</p>
            <span className="h-[1px] w-full bg-gray-300 dark:bg-gray-600"></span>
          </div>

          {/* Google Login */}
          <div
            className="flex items-center justify-center border border-gray-300 dark:border-gray-600 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
            onClick={onGoogleSignIn}
          >
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
    </div>
  );
};

export default LoginForm;
