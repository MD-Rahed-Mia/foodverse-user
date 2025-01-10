import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { DateTime } from "luxon";
import { toast } from "react-hot-toast";
import { api_path_url, authToken } from "../../secret";
import axios from "axios";
import { FaMotorcycle } from "react-icons/fa6";

function RestaurantCard({ detail }) {
  const [isOpen, setIsOpen] = useState(false);

  // console.log(detail)

  const [deliveryCharge, setDeliveryCharge] = useState(0);

  // check delivery charge
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


  async function calcdeliveryCharge() {
    const cood = JSON.parse(localStorage.getItem("locationCoordinators"));
    if (cood) {
      const result = calculateDistance(cood.lat, cood.long, detail?.coordinator.lat, detail?.coordinator.long);
      try {
        const { data } = await axios.get(
          `${api_path_url}/charges/active-schedule`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );



        const otherKm = result - 1;

        const charges = data.charges[0].userOthersKMCharge * otherKm + data.charges[0].userFirstKMCharge;

        if (charges < 25) {
          setDeliveryCharge(25);
        } else {

          setDeliveryCharge(charges);
        }

        // console.log(charges)


      } catch (error) {
        console.log(error);
      }
    }

  }

  useEffect(() => {
    calcdeliveryCharge()
  }, [detail])



  useEffect(() => {
    if (detail) {
      try {
        if (!detail.isOpen) {
          setIsOpen(false);
          return;
        }
        // Parse and standardize time strings
        const openingTime = detail.openingTime.trim().toUpperCase();
        const closingTime = detail.closingTime.trim().toUpperCase();

        const openTime = DateTime.fromFormat(openingTime, "hh:mm a", {
          zone: "Asia/Dhaka",
        });
        let closeTime = DateTime.fromFormat(closingTime, "hh:mm a", {
          zone: "Asia/Dhaka",
        });

        const now = DateTime.now().setZone("Asia/Dhaka");

        // Adjust closing time if it is the next day
        if (closeTime <= openTime) {
          closeTime = closeTime.plus({ days: 1 });
        }

        // Log times for debugging
        // console.log("Opening Time:", openTime.toISO());
        // console.log("Closing Time:", closeTime.toISO());
        // console.log("Current Time:", now.toISO());

        // Determine if the restaurant is open
        if (now >= openTime && now <= closeTime) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error parsing or comparing times:", error);
        setIsOpen(false); // Fail-safe to set closed
      }
    }
  }, [detail]);

  // handle restaurant close
  function handleClosedRestaurant() {
    toast.error("currently restaurant is closed. ");
  }

  return (
    <div
      className={`w-full min-w-60 border-2 shadow-md cursor-pointer rounded-md p-2 bg-blue-50 relative ${isOpen ? "cursor-pointer" : "cursor-not-allowed"
        }`}
    >
      <Link to={`/list-restaurant/${detail._id}&is_open=${isOpen}`}>
        <img
          src={detail.image || "/img/default_rest_image.webp"}
          alt="restaurant"
          className="w-full h-[140px] rounded-md object-cover sm:h-32 md:h-44 lg:h-52 "
        />
        {/* Restaurant Logo */}
        <div className="p-1 rounded-md bg-white absolute left-4 top-28 w-20 h-20 ">
          <img
            src={detail.image || "/img/default_rest_image.webp"}
            alt="restaurant"
            className=" rounded-lg w-full h-full object-cover "
          />
        </div>
        <div className="py-2  ">
          <h1 className="font-bold text-xl text-gray-700 pl-24 mb-2 sm:pl-0 sm:mb-0">
            {detail.name}
          </h1>

          <div className="flex items-center text-[14px] justify-between px-2">
            <h1 className="text-sm font-semibold text-gray-700 pt-2">
              {detail.address}
            </h1>
          </div>

          <div className="w-full flex  items-center justify-between">
            <h1 className="font-semibold  flex items-center gap-2 text-gray-600 pl-2 text-[13px]"><FaMotorcycle /> {deliveryCharge.toFixed()} Delivery Fee</h1>


            <div className="flex items-center justify-between pt-2">
              <HiOutlineStar className="size-5 text-purple-500" />
              <p className="px-2 font-bold text-gray-700">
                {detail.averageReview % 1 === 0 ? `${detail.averageReview}.0` : detail.averageReview}
              </p>
            </div>
          </div>

          <div>
            {!detail.isOpen ? (
              <div className="bg-red-500 px-8 py-2 rounded-full text-white absolute top-1/4 right-4">
                <h1>Closed</h1>
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
