import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../Layout/Footer";

const LogoutConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
        <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Yes, Logout
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the logout confirmation modal
  };

  const handleLogoutConfirm = () => {
    
    localStorage.removeItem("user");
    navigate("/signin"); // Redirect to sign-in page after logout
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false); // Close the modal without logging out
  };

  return (
    <div className="bg-gradient-to-r from-purple-200 to-blue-200 min-h-screen">
      {/* Profile Section */}
      <section id="profile-section" className="p-8 pb-16">
        {/* ... other profile content ... */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-16 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-4 text-white">
              <h2 className="text-2xl font-bold">Md Ibrahim</h2>
              <p>18 May, 2024</p>
            </div>
          </div>
        </div>
        {/* General */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-purple-600">General</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
              <svg
                className="w-6 text-slate-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link to="/profile">
                <span className="px-1">Profile</span>
              </Link>
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
              <svg
                className="w-6 text-slate-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link to="/AddressManager">
                <span className="px-1">My Address</span>
              </Link>
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
              <svg
                className="w-6 text-slate-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="px-1">Language</span>
            </li>
          </ul>
        </div>
        {/* Promotional Activity */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-purple-600">
            Promotional Activity
          </h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
              <svg
                className="w-6 text-slate-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="px-1">Vouchers</span>
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
              <svg
                className="w-6 text-slate-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
              </svg>
              <span className="px-1">My Wallet</span>
            </li>
          </ul>
        </div>
        {/* Earnings */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-purple-600">Earnings</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
              <svg
                className="w-6 text-slate-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              <a href="https://restaurant.foodversedelivery.com/register" target="_blank" rel="noreferrer">
                <span className="px-1">Join as a Delivery Man</span>
              </a>
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
              <svg
                className="w-6 text-slate-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                <path
                  fillRule="evenodd"
                  d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link to="/RestaurantForm">
                <span className="px-1"> Add Your Restaurant</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Log out section */}
        <div className="flex justify-center items-center">
          <button
            className="flex flex-row font-bold items-center mt-6"
            onClick={handleLogoutClick}
          >
            <div className="bg-red-600 rounded-full p-1">
              <svg
                className="text-white w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                />
              </svg>
            </div>
            <span className="text-gray-800 pl-1">Logout</span>
          </button>
        </div>

        {/* Logout confirmation modal */}
        <LogoutConfirmationModal
          show={showLogoutModal}
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
        />
      </section>
    </div>
  );
};

export default Profile;
