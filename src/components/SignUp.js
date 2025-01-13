import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OtpComponent from './otp/OtpComponent';
import toast from 'react-hot-toast';


const formInitialState = {
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
}

const SignUpForm = () => {
    const [formData, setFormData] = useState(formInitialState);

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Validate form data
    const validateForm = () => {
        const { fullName, phoneNumber, password, confirmPassword, terms } = formData;

        if (!fullName) {
            setErrorMessage('Please enter your full name.');
            return false;
        }

        if (phoneNumber.length !== 11 || isNaN(phoneNumber)) {
            setErrorMessage('Please enter a valid 11-digit phone number.');
            return false;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return false;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return false;
        }

        if (!terms) {
            setErrorMessage('You must agree to the terms and conditions.');
            return false;
        }

        setErrorMessage('');
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/send-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': process.env.REACT_APP_API_TOKEN
                    },
                    body: JSON.stringify({
                        phoneNumber: formData.phoneNumber,
                        email: formData.email
                    })
                });

                const data = await response.json();

                console.log(data)

                if (data.success) {
                    // alert('Registration successful!');
                    setFormData(formInitialState)
                    navigate("/otp", { state: formData })
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Network error:', error);
                setErrorMessage('Network error. Please try again later.');
            }
        }
    };


    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white p-6 space-y-6">

                {/* <OtpComponent phoneNumber={formData.phoneNumber} /> */}
                {/* Logo */}
                <div className="text-center">
                    <img src="./img/foodverselogo.png" alt="Food Verse Logo" className="mx-auto w-40 h-40" />
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-300">
                        <span className="inline-block pr-2 py-1 rounded text-purple-500">+880</span>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full outline-none"
                            maxLength="11"
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer">
                            {/* Eye/Eye-Slash Toggle Icon */}
                            {showPassword ? '👁' : '🙈'}
                        </span>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-3 cursor-pointer">
                            {/* Eye/Eye-Slash Toggle Icon */}
                            {showConfirmPassword ? '👁' : '🙈'}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
                        />
                        <label className="text-gray-500 text-sm ">
                            By signing up, I agree with all the <Link to='#' className="text-blue-500 underline">Terms & Conditions</Link>
                        </label>
                    </div>

                    {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

                    <div>
                        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-bold">
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        Already have an account? <Link to='/SignIn' className="text-blue-500 underline">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
