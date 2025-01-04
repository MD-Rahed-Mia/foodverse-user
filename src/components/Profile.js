import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api_path_url, authToken } from "../secret";
import axios from "axios";
import toast from "react-hot-toast";

const MainProfile = () => {
  const profile = [{ name: "Ibrahim", img: "./img/Ibrahimtest.jpg" }];

  const [profileImage, setProfileImage] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    async function fetchUserInformation() {
      try {
        const apiResponse = await fetch(
          `${api_path_url}/user/profile-info?id=${localUser.id}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
            method: "GET",
          }
        );

        const result = await apiResponse.json();

        if (result.success) {
          setUser(result?.user);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserInformation();
  }, []);

  async function handleProfileImage(e) {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select profile picture.");
      return false;
    }

    if (window.confirm("are you sure to change profile picture?")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();

      formData.append("profileImage", file);

      const response = await axios.put(
        `${api_path_url}/user/update-profile-picture?id=${user.id}`,
        formData,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );
      const data = await response.data;

      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.success(data.message);
      }
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center min-h-screen p-2">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-6 px-6">
          <div className="flex justify-center">
            <div className="relative">
              <form method="post" encType="multipart/form-data">
                <label
                  className="absolute top-0 left-0 w-full h-full"
                  htmlFor="profileImage"
                ></label>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  name="profileImage"
                  hidden
                  onChange={handleProfileImage}
                />
              </form>
              <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                src={user?.profileImage}
                alt={profile.name}
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full shadow-md">
                <svg
                  className="w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="mt-4 text-white text-center text-xl font-bold">
            {user?.fullName}
          </h2>
        </div>

        {/* Profile Details */}
        <div className="p-2 space-y-2">
          {/* Birthday */}
          <div className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Birthday</span>
            <span className="ml-auto text-gray-500">Aug 21, 2004</span>
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Phone Number</span>
            <span className=" text-gray-500">{user?.phoneNumber}</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.71 5.03a1.998 1.998 0 002.58 0L21 8M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9-6-9 6"
                ></path>
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Email</span>
            <span className=" text-gray-500">{user?.email}</span>
          </div>

          {/* Password */}
          <Link to={"/change-password"} className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.71 5.03a1.998 1.998 0 002.58 0L21 8M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9-6-9 6"
                ></path>
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Change password</span>

          </Link>
        </div>

        {/* Edit Profile Button */}
        <div className="p-2">
          <Link
            to="/"
            className="w-full block text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-full shadow-md hover:from-purple-700 hover:to-blue-700 transition duration-300 ease-in-out"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
