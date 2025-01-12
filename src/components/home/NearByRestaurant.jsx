import React, { useEffect, useMemo, useState } from 'react'
import RestaurantCard from '../restaurant/RestaurantCard';
import axios from 'axios';
import { api_path_url, authToken } from '../../secret';
import { useAuth } from '../../contexts/AuthContext';
import Cookies from "js-cookie";
import LoadingSkeleton from '../skeleton/LoadingSkeleton';

export default function NearByRestaurant() {
    const [restaurant, setRestaurant] = useState([]); // Initialize as an empty array
    const { currentAddress } = useAuth();
    const [loading, setLoading] = useState(false);

    // Function to fetch nearby restaurants
    async function getNearByRestaurant() {

        setLoading(true);
        setRestaurant(null);

        try {

            const { data } = await axios.get(
                `${api_path_url}/restaurant?lat=${currentAddress?.latitude}&long=${currentAddress?.longitude}`,
                {
                    headers: {
                        "x-auth-token": authToken,
                    }
                }
            )

            if (data.success) {
                setRestaurant(data.restaurant);
            }
        } catch (error) {
            console.error("Error fetching nearby restaurants:", error);
            setRestaurant([]);
        } finally {
            setLoading(false);
        }
    }


    useMemo(() => {
        getNearByRestaurant();
    }, [currentAddress])

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
