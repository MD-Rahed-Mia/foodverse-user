import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { api_path_url, authToken } from "../../secret";
import RestaurantCard from "../restaurant/RestaurantCard";

export default function RestaurantScroller() {
  const [restaurant, setRestaurant] = useState([]);
  const [totalRestaurant, setTotalRestaurant] = useState(0);
  const [page, setPage] = useState(1); // Start from page 1

  async function getRestaurant() {
    try {
      // Increment page number on each fetch
      const { data } = await axios.get(
        `${api_path_url}/user/restaurant-list?limit=5&page=1`,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (data.success) {
        setRestaurant(data.result);
        setTotalRestaurant(data.total);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchMore() {
    // setPage((prev) => prev + 1);
    // console.log("current page is : ", page);
    try {
      const { data } = await axios.get(
        `${api_path_url}/user/restaurant-list?limit=5&page=${page + 1}`,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (data.success) {
        // console.log('result : ', data.result)
        setRestaurant((prev) => [...prev, ...data.result]);
      }
    } catch (error) {
      console.log("failed to fetch more items.", error);
    }
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={restaurant.length}
        next={fetchMore}
        hasMore={restaurant.length < totalRestaurant}
        loader={<h1>Loading...</h1>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div
          id="scrollableDiv"
          className="w-full px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 py-2"
        >
          {restaurant.map((item, index) => {
            return <RestaurantCard key={index} detail={item} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
