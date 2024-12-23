import React, { useEffect, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { useCartContext } from "../../contexts/CartContext";

export default function AsapCalculator({ distance }) {
  const { cart } = useCartContext();
  const [time, setTime] = useState(0);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    // calculate time
    const getHighestTime = () => {
      let highestTime = 0;

      cart?.forEach((item) => {
        if (item.preparationTime > highestTime) {
          highestTime = item.preparationTime;
        }
      });

      setTime(Number(highestTime) + Number(distance * 5));
    };

    getHighestTime();

    // console.log(cart);
  }, [cart, distance]);

  return (
    <div className="flex item-center justify-center">
      <MdDeliveryDining className="size-6 mx-1 text-purple-600" />
      <p className="text-center text-blue-600 font-bold">
        Asap ({time.toFixed()} min)
      </p>
    </div>
  );
}
