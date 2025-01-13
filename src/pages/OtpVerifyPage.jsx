import React from 'react'
import OtpComponent from '../components/otp/OtpComponent'
import { useLocation } from 'react-router-dom'

export default function OtpVerifyPage() {

    const location = useLocation();

    const receivedData = location.state;

    // console.log(receivedData);

    if (!receivedData) {
        return <div>No data received.</div>;
    }
    return (
        <div className='w-full h-screen flex items-center justify-center flex-col'>
            <div>
                <img src={"/img/foodverselogo.png"} alt="foodverese" className='w-32' />
            </div>
            <OtpComponent userInfo={receivedData} />
        </div>
    )
}
