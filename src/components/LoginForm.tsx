import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import {
  doPasswordReset,
  doSignInWithEmailAndPassword,
  // doSignInWithGoogle,
} from "../firebase/auth";
import { notification } from "../lib/helper";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn, loginFormData, setLoginFormData } =
    useMainContext();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Partial<LoginFormData> = {};

    if (!loginFormData.email) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(loginFormData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!loginFormData.password) {
      validationErrors.password = "Password is required.";
    } else if (loginFormData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && !isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(
          loginFormData.email,
          loginFormData.password
        );
        setUserLoggedIn(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  // const onGoogleSignIn = async (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   if (!isSigningIn) {
  //     setIsSigningIn(true);
  //     try {
  //       await doSignInWithGoogle();
  //       notification("Successfuly Logged In");
  //       setUserLoggedIn(true);

  //       navigate("/user");
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setIsSigningIn(false);
  //     }
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleForgotPassword = async () => {
    const email = loginFormData.email;
    if (!email) {
      notification("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      notification("Please enter a valid email address.");
      return;
    }

    try {
      await doPasswordReset(email);
      notification("Password reset email sent successfully. Check your inbox.");
    } catch {
      notification("Failed to send password reset email.");
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/user");
    }
  }, [userLoggedIn, navigate]);

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
              value={loginFormData.email}
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
              value={loginFormData.password}
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
          <div className="flex-end w-full  mt-3">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex-end items-end flex"
            >
              Forgot Password?
            </button>
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
          {/* <div className="flex items-center justify-center">
            <span className="h-[1px] w-full bg-gray-300 dark:bg-gray-600"></span>
            <p className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</p>
            <span className="h-[1px] w-full bg-gray-300 dark:bg-gray-600"></span>
          </div> */}

  
          {/* <div
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
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
