import React, { useEffect, useState } from 'react'
import { FaMapLocation } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios';
import { api_path_url, authToken } from '../../secret';
import Footer from '../../Layout/Footer';

export default function AddressComponent({ isAddressAvailable, setIsAddressAvailable }) {

    const [addressList, setAddressList] = useState(null);


    async function getDeliveryLocationList() {
        const id = Cookies.get("id");
        const label = localStorage.getItem("selectedLocation");

        try {
            const { data } = await axios.get(
                `${api_path_url}/user/delivery/location?id=${id}`,
                {
                    headers: {
                        "x-auth-token": authToken,
                    },
                }
            );

            if (data.success) {
                const addressData = data.address[label]?.address;



                if (data.address.office.label === undefined && data.address.home.label === undefined && data.address.others.label === undefined) {
                    //  console.log(`currently no address setup. `);
                    setIsAddressAvailable(false);

                } else {
                    setIsAddressAvailable(true);
                    setAddressList(addressData)
                }

            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getDeliveryLocationList();
    }, []);
    return (
        <div>
            <div>
                {/* Homw Empty Massage */}
                <section className={`flex items-center justify-center  bg-white ${isAddressAvailable ? "" : "min-h-screen fixed w-full bottom-0 left-0 overflow-hidden"}`}>
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
                                <FaMapLocation className="size-16 text-blue-700" />
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Please Set Your Address
                        </h2>
                        <p className="text-gray-600">
                            We will give you restaurant and food item
                        </p>
                        <p className="text-gray-600 mb-6">according to your location.</p>

                        <Link
                            to="/SetAddressManager"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Address
                        </Link>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    )
}
