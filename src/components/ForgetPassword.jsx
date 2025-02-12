import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_path_url, authToken } from "../secret";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  function validatePhoneNumber(phoneNumber) {
    if (phoneNumber.length !== 11) {
      return false;
    } else {
      return true;
    }
  }

  async function handleVerifyPhoneNumber(e) {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number.");
      return false;
    }

    try {
      const { data } = await axios.post(
        `${api_path_url}/user/verify-phonenumber`,
        {
          phoneNumber,
        },
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      //   console.log("data is : ", data);

      if (data.success) {
        navigate("/forget-password/verify-otp", {
          state: {
            phoneNumber: phoneNumber,
          },
        });
      }
    } catch (error) {
      console.log("verfiy phone number error: ", error);
    }
  }

  return (
    <div className="h-screen w-full flex-col flex items-center justify-center">
      <img src="/img/foodverselogo.png" alt="logo" className="w-[140px]" />

      <form
        action=""
        method="post"
        className="w-[85%]"
        onSubmit={handleVerifyPhoneNumber}
      >
        <h1 className="text-center text-lg font-bold my-8">Forget password</h1>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-gray-400 text-sm font-bold"
          >
            Phone number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="your phone number"
            className="w-full border-gray-600 rounded-sm border px-1 py-2 "
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-center w-full px-4 py-2 text-white mt-4 rounded-sm"
            onClick={handleVerifyPhoneNumber}
          >
            Verify account
          </button>
        </div>
      </form>
    </div>
  );
}
