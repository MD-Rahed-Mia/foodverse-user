import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import handleApiRequest from "../helpers/handleApiRequest";
import Loading from "../components/Loading";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api_path_url, authToken } from "../secret";
import ReviewViewCard from "../components/review/ReviewViewCard";

function RatingPage() {
  const [loading, setLoading] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { restaurantId } = useParams();

  useEffect(() => {
    async function getRestaurantProfile() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${api_path_url}/restaurant/get-profile?id=${restaurantId}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
            method: "GET",
          }
        );

        console.log(data);

        if (data.success) {
          setRestaurant(data.restaurant);
          setLoading(true);
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    async function fetchData() {
      await getRestaurantProfile();
    }
    fetchData();
  }, [restaurantId]);

  useEffect(() => {
    async function getReviewForRestaraurant() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${api_path_url}/restaurant/reveiw/get-review?id=${restaurantId}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
            method: "GET",
          }
        );

        console.log(data);

        if (data.success) {
          // setRestaurant(data.restaurant);
          setLoading(false);
          setReviews(data.review);
        }
      } catch (error) {
        console.log(error.message);

        setLoading(false);
        if (error.response) {
          console.log(error.response);
        }

        throw new Error(error);
      }
    }

    getReviewForRestaraurant();
  }, [restaurantId]);

  return (
    <div className="mb-24">
      <div className="">
        <header className="bg-white p-4 m-4 -mb-4 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={restaurant?.image || "img/burger.png"}
              alt="restaurant-image"
              className="w-20 h-16 rounded-md object-cover shadow-md"
            />
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-gray-800">
                {restaurant?.name}
              </h1>
              <p className="text-sm text-gray-500">
                0.2km away |{" "}
                <span className="text-gray-800 font-medium">Free delivery</span>{" "}
                | Tk 500 Minimum
              </p>
            </div>
          </div>
        </header>
      </div>

      <div className="mt-12 bg-white py-2 px-8  flex items-center justify-between border shadow-lg rounded-md w-4/5 mx-auto">
        <h1>Total Rating: {restaurant?.totalReviews}</h1>
        <h1>
          Average Rating:{" "}
          {Number.isInteger(reviews?.averageRating)
            ? reviews?.averageRating + ".0"
            : reviews?.averageRating}
        </h1>
      </div>
      <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 place-items-center p-4">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : null}
        {reviews?.length > 0
          ? reviews.map((review, index) => {
              return <ReviewViewCard review={review} key={index} />;
            })
          : null}
      </div>
    </div>
  );
}

export default RatingPage;
