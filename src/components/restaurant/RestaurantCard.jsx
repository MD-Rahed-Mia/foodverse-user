import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";

function RestaurantCard({ detail }) {
  return (
    <div className="w-full border-2 shadow-md cursor-pointer rounded-md p-2 bg-blue-50 relative">
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
    </div>
  );
}

export default RestaurantCard;
