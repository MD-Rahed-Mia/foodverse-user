import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { api_path_url, authToken } from '../../secret';
import RestaurantCard from '../restaurant/RestaurantCard';

export default function RestaurantScroller() {

    const [restaurant, setRestaurant] = useState([]);
    const [totalRestaurant, setTotalRestaurant] = useState(0);
    const [page, setPage] = useState(1); // Start from page 1

    async function getRestaurant() {
        try {
            // Increment page number on each fetch
            const { data } = await axios.get(`${api_path_url}/user/restaurant-list?limit=5&page=${page}`, {
                headers: {
                    "x-auth-token": authToken
                }
            });

            console.log('this is restaurant : ', data);

            if (data.success) {
                setRestaurant((prev) => ([...prev, ...data.result]));
                setTotalRestaurant(data.total);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getRestaurant(); // Fetch data on initial load
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    return (
        <div>
            <InfiniteScroll
                dataLength={restaurant.length} // This should be the length of the restaurant array
                next={getRestaurant} // Pass the function reference here
                hasMore={restaurant.length < totalRestaurant} // Check if there are more restaurants to load
                loader={<h1>Loading...</h1>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div id="scrollableDiv" className='w-full px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 py-2'>
                    {
                        restaurant.map((item, index) => {
                            return <RestaurantCard key={index} detail={item} />
                        })
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
}
