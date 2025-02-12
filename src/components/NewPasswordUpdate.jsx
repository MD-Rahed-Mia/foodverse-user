import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api_path_url, authToken } from "../secret";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

export default function NewPasswordUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleUpdate(e) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitForm(event) {
    event.preventDefault();

    const cookieOtp = Cookies.get("verifiedOtp");
    const verifyPhoneNumber = Cookies.get("verifyNumber");

    if (!cookieOtp || !verifyPhoneNumber) {
      navigate("/forget-password");
      return;
    }

    try {
      const { data } = await axios.post(
        `${api_path_url}/user/update-new-password`,
        {
          phoneNumber: verifyPhoneNumber,
          otp: cookieOtp,
          newPassword: formState.password,
        },
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data));
        Cookies.set("id", data.id, { expires: 1 });
        setCurrentUser(data.id);

        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("form submit error : ", error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full h-screen flex items-center flex-col justify-center">
      <img src="/img/foodverselogo.png" alt="logo" className="w-[140px]" />
      <form
        action=""
        className="w-4/5 mx-auto"
        method="post"
        onSubmit={handleSubmitForm}
      >
        <div>
          <label
            htmlFor="password"
            className="font-bold text-sm text-gray-400 mt-4 block"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="new password"
            className="px-1 py-2 rounded-sm border w-full"
            value={formState.password}
            onChange={handleUpdate}
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="font-bold text-sm text-gray-400 mt-4 block"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm password"
            className="px-1 py-2 rounded-sm border w-full"
            value={formState.confirmPassword}
            onChange={handleUpdate}
          />
        </div>
        <button className="bg-blue-500 text-center w-full px-4 py-2 text-white mt-4 rounded-sm">
          Update Password
        </button>
      </form>
    </div>
  );
}
