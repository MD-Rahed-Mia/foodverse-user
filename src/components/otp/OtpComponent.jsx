import React, { useState } from 'react'
import { Button, Flex, Input, Typography } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

function OtpComponent({ userInfo }) {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const onChange = (text) => {
        console.log('onChange:', text);
        setOtp(text);
    };
    const onInput = (value) => {
        console.log('onInput:', value);
    };
    const sharedProps = {
        onChange,
        onInput,
    };

    // sign up after verify otp
    async function signUpUser(information) {
        try {

            console.log(information);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': process.env.REACT_APP_API_TOKEN
                },
                body: JSON.stringify({
                    ...information
                })
            });

            const data = await response.json();

            console.log('information are : ', information)
            console.log(data)

            if (data.success) {
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            console.error('Network error:', error);
            return false;
        }
    }

    async function handleVerifyOTP() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': process.env.REACT_APP_API_TOKEN
                },
                body: JSON.stringify({
                    phoneNumber: userInfo.phoneNumber,
                    userOTP: otp
                })
            });

            const data = await response.json();

            console.log(data)

            if (data.success) {
                const signUp = signUpUser(userInfo);
                if (signUp) {
                    toast.success("register successful");
                    navigate("/signin")
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <div>
            <Flex gap="middle" align="flex-start" vertical>
                <Title level={5}>Varify OTP </Title>
                <Input.OTP length={6} {...sharedProps} />

                <Button className='w-full px-4 py-3 bg-blue-500 text-white ' onClick={handleVerifyOTP}>
                    Verify OTP
                </Button>
            </Flex>

        </div>
    )
}

export default OtpComponent