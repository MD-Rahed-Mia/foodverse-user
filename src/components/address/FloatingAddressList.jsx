import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../../contexts/AuthContext';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

export default function FloatingAddressList() {
    const { isFloatingAddressActive, setIsFloatingAddressActive, user, setUser, selectedAddress, setSelectedAddress } = useAuth();
    const [addressList, setAddressList] = useState(null);
    // const [selectedAddress, setSelectedAddress] = useState("");
    const [currentAddress, setCurrentAddress] = useState({
        label: "current",
        address: "your current address.",
        name: user?.fullName,
        phoneNumber: user?.phoneNumber,
        latitude: "",
        longitude: ""
    });

    // Fetch the user's current location (latitude & longitude)
    const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentAddress((prevState) => ({
                        ...prevState,
                        latitude: latitude,
                        longitude: longitude,
                        address: "Your current location." // You can update this with a reverse geolocation API if you want a more descriptive address.
                    }));

                    setUser((prev) => ({ ...prev, address: { ...prev.address, current: { ...currentAddress, latitude, longitude } } }))
                },
                (error) => {
                    console.error("Error getting location:", error);
                    // Handle error - for example, set default location or show an error message
                    setCurrentAddress((prevState) => ({
                        ...prevState,
                        address: "Location access denied or unavailable.",
                    }));
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    // Update the address list whenever user data or current address changes
    useEffect(() => {
        // Fetch current location on initial render or when the component mounts
        fetchCurrentLocation();
    }, []);


    useEffect(() => {
        if (selectedAddress === null || selectedAddress === undefined) {
            if (user?.address) {

                const firstKey = Object.keys(user?.address)[0];
                const firstValue = user?.address[firstKey];

                if (firstKey && firstValue) {
                    setSelectedAddress(firstValue);
                }
            }
        }

        //   console.log(selectedAddress);
    }, [user, selectedAddress]);



    useEffect(() => {
        if (user?.address) {
            // Merge currentAddress with user addresses
            setAddressList({ ...user?.address, current: currentAddress });
        }
    }, [user, currentAddress]);

    // useEffect(() => {
    //     console.log(addressList);  // Debug log to check the address list structure
    // }, [addressList]);

    useEffect(() => {
        const interval = setTimeout(() => {
            setIsFloatingAddressActive(true);
        }, 20000);  // Trigger floating address list after 10 seconds
    }, []);

    const handleAddressSelect = (addressDetails) => {
        //  setSelectedAddress(addressDetails?.label);
        localStorage.setItem("selectedLocation", addressDetails.label || "current");
        localStorage.setItem("locationCoordinators", JSON.stringify({
            lat: addressDetails.latitude,
            long: addressDetails.longitude
        }));
        setSelectedAddress(user?.address[addressDetails?.label])
        setIsFloatingAddressActive(!isFloatingAddressActive);
    };


    // useEffect(() => {
    //     localStorage.setItem("selectedLocation", "current");
    //     setSelectedAddress("current")
    // }, [])



    return (
        <>
            {
                isFloatingAddressActive &&
                <div className='w-full min-h-[95%] z-50 fixed bottom-0 left-0 bg-black bg-opacity-40'>
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
                                    const addressDetails = addressList[category];

                                    if (addressDetails?.label === undefined) {
                                        return null; // Skip addresses without labels
                                    }

                                    return (
                                        <div key={index}>
                                            <h2 className="font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                            <div className='flex items-center gap-2'>
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    id={`address-${category}`}
                                                    value={addressDetails.label}
                                                    checked={selectedAddress?.label === addressDetails.label || selectedAddress === "current"} // Only select if the label matches the selected address
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
                                })
                                : null
                        }

                        <Link
                            to="/SetAddressManager"
                            className="bg-gradient-to-r inline-block mx-auto mt-4 from-purple-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Address
                        </Link>
                    </div>
                </div>
            }
        </>
    );
}
