import React, { useEffect, useState } from 'react'
import RestaurantCard from '../restaurant/RestaurantCard';
import axios from 'axios';
import { api_path_url, authToken } from '../../secret';
import { useAuth } from '../../contexts/AuthContext';
import Cookies from "js-cookie";
import LoadingSkeleton from '../skeleton/LoadingSkeleton';

export default function NearByRestaurant() {
    const [restaurant, setRestaurant] = useState([]); // Initialize as an empty array
    const { isFloatingAddressActive, setIsFloatingAddressActive, user, selectedAddress } = useAuth();
    const [addressList, setAddressList] = useState(null);
    const [loading, setLoading] = useState(false);




    // Function to get delivery location list
    async function getDeliveryLocationList() {
        const selectedAddress = localStorage.getItem('selectedLocation');
        try {
            const currentAddress = user?.address[selectedAddress];
            console.log(user?.address[currentAddress])
            setAddressList(currentAddress)

        } catch (error) {
            console.error("Error fetching delivery locations:", error);
        }
    }

    // Function to fetch nearby restaurants
    async function getNearByRestaurant() {

        setLoading(true);
        setRestaurant(null);
        try {
            const { data } = await axios.get(
                `${api_path_url}/restaurant?lat=${selectedAddress?.latitude}&long=${selectedAddress?.longitude}`,
                {
                    headers: {
                        "x-auth-token": authToken,
                    }
                }
            );

            if (data.success) {
                setRestaurant(data.restaurant);
            } else {
                setRestaurant([]);
            }
        } catch (error) {
            console.error("Error fetching nearby restaurants:", error);
            setRestaurant([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNearByRestaurant()
    }, []);

    useEffect(() => {
        getNearByRestaurant()
    }, [selectedAddress]);
    return (
        <div className='max-w-full flex custom-scrollbar no-scrollbar scroll-smooth py-4 overflow-x-scroll gap-4 px-2'>
            {loading && <LoadingSkeleton />}
            {!loading && restaurant.length === 0 && <h1>Currently no restaurant available...</h1>}

            {restaurant && restaurant.map((item, index) => (
                <RestaurantCard key={index} detail={item} />
            ))}
        </div>
    );
}
