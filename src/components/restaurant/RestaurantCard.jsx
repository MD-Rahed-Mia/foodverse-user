import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { DateTime } from "luxon";

function RestaurantCard({ detail }) {
  const [isOpen, setIsOpen] = useState(null);

  // console.log()
  //

  useEffect(() => {
    if (detail) {
      // Parse time strings
      const openTime = DateTime.fromFormat(detail?.openingTime, "hh:mm a", {
        zone: "Asia/Dhaka",
      });
      const closeTime = DateTime.fromFormat(detail?.closingTime, "hh:mm a", {
        zone: "Asia/Dhaka",
      });
      const now = DateTime.now().setZone("Asia/Dhaka");

      // Compare times
      if (now >= openTime && now <= closeTime) {
        console.log("The time is within range.");
        setIsOpen(true);
      } else {
        console.log("The time is outside the range.");
        setIsOpen(false);
      }
    }
  }, [detail]);

  return (
    <div className="w-full border-2 shadow-md cursor-pointer rounded-md p-2 bg-blue-50 relative">
      {isOpen || detail?.isOpen ? (
        <Link to={`/restaurant/${detail._id}`}>
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
          <div className="py-2">
            <h1 className="font-bold text-xl text-gray-700 pl-24 mb-2 sm:pl-0 sm:mb-0  ">
              {detail.name}
            </h1>
            <div className="flex items-center justify-between px-2">
              <h1 className="text-sm font-semibold text-gray-700 pt-2">
                {detail.address}
              </h1>
              <div className="flex items-center justify-between pt-2">
                <HiOutlineStar className="size-5 text-purple-500" />
                <p className="px-2 font-bold text-gray-700">
                  {detail.averageReview}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <h1 className="font-bold bg-blue-500 text-white text-[12px] px-2 py-1 rounded-full">
              10% discount on any items
            </h1>
          </div>
        </Link>
      ) : (
        <div>
          <div className="relative">
            <img
              src={detail.image || "/img/default_rest_image.webp"}
              alt="restaurant"
              className="w-full h-[140px] rounded-md object-cover sm:h-32 md:h-44 lg:h-52 "
            />
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg shadow-md font-bold text-black bg-gray-200">
              currently restaurant is closed.
            </h1>
          </div>

          {/* Restaurant Logo */}
          <div className="p-1 rounded-md bg-white absolute left-4 top-28 w-20 h-20 ">
            <img
              src={detail.image || "/img/default_rest_image.webp"}
              alt="restaurant"
              className=" rounded-lg w-full h-full object-cover "
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantCard;
