import React, { useEffect, useState } from "react";
import { api_path_url, authToken } from "../secret";
import MenuCard from "./MenuCard";
import Footer from "../Layout/Footer";

const RestaurantPage = () => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    async function fetchUserInformation() {
      try {
        const apiResponse = await fetch(`${api_path_url}/menu`, {
          headers: {
            "x-auth-token": authToken,
          },
          method: "GET",
        });

        const result = await apiResponse.json();

        console.log(result);

        if (result.success) {
          setMenu(result?.menus);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserInformation();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-purple-200 to-blue-200">
      {/* Header Section */}
      <header className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="img/burger.png"
            alt="Boom Boom Burger"
            className="w-20 h-16 rounded-md object-cover shadow-md"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-800">
              Boom Boom Burger
            </h1>
            <p className="text-sm text-gray-500">
              0.2km away |{" "}
              <span className="text-gray-800 font-medium">Free delivery</span> |
              Tk 500 Minimum
            </p>
          </div>
        </div>
      </header>

      {/* Delivery Info Section */}
      <section className="bg-white mt-4 p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="h-6 w-6 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span className="text-lg font-semibold text-gray-800">4.7</span>
            <span className="text-sm text-gray-600">5000+ ratings</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              Delivery:{" "}
              <span className="font-semibold text-gray-800">10-25 min</span>
            </p>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="mt-6 mb-12">
        <div className="bg-white my-4 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800">All item</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {menu &&
            menu?.map((item) => <MenuCard detail={item} key={item.name} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RestaurantPage;