import React, { useEffect, useState } from "react";
import { Flex, Input, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_path_url, authToken } from "../../secret";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function VerifyForgetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtop] = useState("");

  const stateData = location.state;

  useEffect(() => {
    if (!stateData) {
      navigate("/forget-password");
    } else {
      console.log("state phoneNumber: ", stateData);
    }
  }, [stateData]);

  const onChange = (text) => {
    setOtop(text);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };

  async function verifyOTP(otp) {
    //  console.log("verify otp is : ", otp);

    if (!otp || otp.length !== 6) {
      toast.error("Invalid OTP.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${api_path_url}/user/verify-otp-update-password`,
        {
          phoneNumber: stateData.phoneNumber,
          otp: otp,
        },
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (data.success) {
        Cookies.set("verifiedOtp", otp, {
          expires: 1,
          secure: true,
          sameSite: true,
        });

        Cookies.set("verifyNumber", stateData.phoneNumber, {
          expires: 1,
          secure: true,
          sameSite: true,
        });

        navigate("/update-password", {
          state: {
            phoneNumber: stateData.phoneNumber,
            otp: otp,
          },
        });
      }
    } catch (error) {
      console.log("verifiation error : ", error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div
      className="w-full  h-screen
  flex items-center justify-center flex-col gap-8"
    >
      <img src="/img/foodverselogo.png" alt="logo" className="w-[140px]" />

      <div className="w-[85%] flex items-center justify-center flex-col">
        <Input.OTP length={6} {...sharedProps} value={otp} />

        <button
          className="bg-blue-500 text-center w-4/5 px-4 py-2 text-white mt-4 rounded-sm"
          onClick={() => verifyOTP(otp)}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
