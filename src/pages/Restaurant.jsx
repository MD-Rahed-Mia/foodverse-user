import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import handleApiRequest from "../helpers/handleApiRequest";
import Loading from "../components/Loading";
import Cookies from "js-cookie"
import axios from "axios";
import { api_path_url, authToken } from "../secret";



function Restaurant() {
  const [allRestaurants, setAllRestaurants] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addressList, setAddressList] = useState(null);


  


  // get user longitude and latitude 
  async function getDeliveryLocationList() {

    const selectedAddress = localStorage.getItem('selectedLocation') || "home";

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

      console.log(data);

      if (data.success) {
        setAddressList(data.address[selectedAddress]);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  

  // get address
  useEffect(() => {
    getDeliveryLocationList()
  }, [])

 
  useEffect(() => {
    async function fetchRestaurant() {
      setAllRestaurants(null)
      setLoading(true);
      const result = await handleApiRequest(`/restaurant?lat=${addressList?.latitude}&long=${addressList?.longitude}`);

      console.log(result);

      if (result?.success) {
        setAllRestaurants(result);
        setLoading(false);
      }
    }
    fetchRestaurant();
  }, [addressList]);

  return (
    <div className="mb-24">
      <div className="pt-[75px]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 place-items-center p-4">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : null}

        {
          allRestaurants?.restaurant.length === 0 ? <h1>No nearby restuarant found</h1> : null
        }

        {allRestaurants?.restaurant.map((rest) => {
          return <RestaurantCard detail={rest} key={rest._id} />;
        })}
      </div>
    </div>
  );
}

export default Restaurant;
