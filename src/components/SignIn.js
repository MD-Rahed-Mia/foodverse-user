// src/components/SignIn.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import AuthContext
import Loading from "./Loading";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, currentUser, setCurrentUser } = useAuth(); // Use login and currentUser from AuthContext

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateSignInForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage("Please enter all fields.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (validateSignInForm()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": process.env.REACT_APP_API_TOKEN,
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (data?.success) {
          localStorage.setItem("user", JSON.stringify(data));
          Cookies.set("id", data.id, { expires: 1 });
          setCurrentUser(data.id)
          setLoading(false);
          navigate("/");
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Network error. Please try again.");
        setLoading(false);
        setErrorMessage("Network error. Please try again later.");
      }
    }
  };

  // If already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 space-y-6">
        <div className="text-center">
          <img
            src="./img/foodverselogo.png"
            alt="Food Verse Logo"
            className="mx-auto w-32 h-32"
          />
        </div>
        <form id="signinForm" className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {/* Eye icon */}
            </span>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 pl-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label className="text-gray-500 text-sm">Remember Me</label>
            </div>
            <div className="pr-2">
              <Link to="#">
                <p className="text-blue-600">Forget Password?</p>
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          {/* Sign In Button */}

          <div>
            {loading ? (
              <div className="w-fit mx-auto my-2 text-lg">
                <Loading />{" "}
              </div>
            ) : null}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-bold"
            >
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
