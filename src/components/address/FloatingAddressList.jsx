import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../../contexts/AuthContext';
import { FaLocationDot } from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";
import { api_path_url, authToken } from '../../secret';

export default function FloatingAddressList() {
    const { isFloatingAddressActive, setIsFloatingAddressActive } = useAuth();
    const [addressList, setAddressList] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(""); // To store the selected address

    async function getDeliveryLocationList() {
        const id = Cookies.get("id");
        try {
            const { data } = await axios.get(
                `${api_path_url}/user/delivery/location?id=${id}`,
                {
                    headers: {
                        "x-auth-token": authToken,
                    },
                }
            );

            console.log("API Data:", data);

            if (data.success) {
                setAddressList(data.address); // Assuming the response has this structure
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        getDeliveryLocationList();
    }, []);

    // useEffect(() => {
    //     console.log("Address List:", addressList);
    // }, [addressList]);

    // Handle the change in the selected address
    const handleAddressSelect = (addressDetails) => {
        setSelectedAddress(addressDetails?.label); // Update selected address state
        localStorage.setItem("selectedLocation", addressDetails.label);
        localStorage.setItem("locationCoordinators", JSON.stringify({
            lat: addressDetails.latitude,
            long: addressDetails.longitude
        }))

        setIsFloatingAddressActive(!isFloatingAddressActive)
      //  console.log("Selected Address:", addressDetails);
    };

    return (
        <>
            {
                isFloatingAddressActive && <div className='w-full min-h-[95%] z-50 fixed bottom-0 left-0 bg-black bg-opacity-40 '>
                    <div className='fixed bottom-0 z-50 left-0 h-[400px] w-full border shadow-md bg-white p-4'>
                        <div className='absolute top-2 right-2 cursor-pointer text-lg' onClick={() => setIsFloatingAddressActive(false)}>
                            <RxCross1 />
                        </div>

                        <div>
                            <h1>Select your desired address...</h1>
                        </div>

                        {/* Check if addressList is an object and contains keys */}
                        {
                            addressList && typeof addressList === "object" ?
                                Object.keys(addressList).map((category, index) => {
                                    // Get the address object for the current category (e.g., home, office)
                                    const addressDetails = addressList[category];

                                    if (addressDetails.label === undefined) {
                                        return null;
                                    }

                                    if (addressDetails) {
                                        return (
                                            <div key={index}>
                                                <h2 className="font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                                <div className='flex items-center gap-2'>
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        id={`address-${category}`}
                                                        value={addressDetails.label}
                                                        checked={selectedAddress === addressDetails.label} // Only select if the label matches the selected address
                                                        onChange={() => handleAddressSelect(addressDetails)} // Handle radio button change
                                                    />
                                                    <FaLocationDot />
                                                    <div>
                                                        <h1>{addressDetails.label}</h1>
                                                        <p>{addressDetails.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null; // Skip categories with no addresses
                                    }
                                })
                                : null
                        }

                    </div>
                </div>
            }
        </>
    );
}
