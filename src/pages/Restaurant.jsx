import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import handleApiRequest from "../helpers/handleApiRequest";
import Loading from "../components/Loading";

function Restaurant() {
  const [allRestaurants, setAllRestaurants] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRestaurant() {
      setLoading(true);
      const result = await handleApiRequest("/restaurant");

      console.log(result);

      if (result?.success) {
        setAllRestaurants(result);
        setLoading(false);
      }
    }
    fetchRestaurant();
  }, []);

  return (
    <div className="mb-24">
      <div className="pt-[75px]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 place-items-center p-4">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : null}

        {allRestaurants?.restaurant.map((rest) => {
          return <RestaurantCard detail={rest} key={rest._id} />;
        })}
      </div>
    </div>
  );
}

export default Restaurant;
