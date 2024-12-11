import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import handleApiRequest from "../helpers/handleApiRequest";
import axios from "axios";
import { api_path_url, authToken } from "../secret";
import MenuCard from "./MenuCard";
import toast from "react-hot-toast";
import RestaurantCard from "./restaurant/RestaurantCard";
import Loading from "./Loading";

const SearchPage = () => {
  const [categories, setCategories] = useState(null);
  const [search, setSearch] = useState("");

  const [searchResult, setSearchResult] = useState(null);
  const [searchBtn, setSearchBtn] = useState(null);
  const [restaurantResult, setRestaurantResult] = useState(null);
  const [loading, setLoading] = useState(null);

  // Handle input changes
  function handleOnChange(e) {
    const value = e.target.value;
    setSearch(value); // Update the search state
  }

  // Handle "Enter" key press
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearchMenus(search); // Trigger search function with the latest value
      setSearchBtn("menu");
    }
  }

  // Trigger the search
  async function handleSearchMenus() {
    setLoading(true);
    try {
      if (search === "") {
        toast.error("please enter your desire items.", {
          duration: 700,
        });
        return;
      }

      const { data } = await axios.get(
        `${api_path_url}/menu/search?search=${search}`,
        {
          headers: {
            "x-auth-token": authToken,
          },
        },
      );

      console.log(data);

      if (data.result.length === 0) {
        setSearchResult(null);
        setLoading(false);
      } else {
        setSearchResult(data.result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        setSearchResult(null);

        setLoading(false);
        toast.error("no result match.", {
          duration: 1000,
        });
      }
    }
  }

  // Trigger the search
  async function handleSearchRestauant() {
    setLoading(true);
    try {
      if (search === "") {
        toast.error("please enter your desire items.", {
          duration: 700,
        });
        return;
      }

      const { data } = await axios.get(
        `${api_path_url}/menu/search/restaurant?search=${search}`,
        {
          headers: {
            "x-auth-token": authToken,
          },
        },
      );

      console.log(data);

      if (data.result.length === 0) {
        setSearchResult(null);
        setLoading(false);
      } else {
        setRestaurantResult(data.result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);

      if (error.response) {
        setSearchResult(null);
        toast.error("no result match.", {
          duration: 1000,
        });
        setLoading(false);
      }
    }
  }

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchData() {
      const apiResponse = await handleApiRequest("/category", {});
      if (apiResponse?.result) {
        setCategories(apiResponse.result);
      } else {
        setCategories(null);
      }
    }

    fetchData();
  }, []);

  // Debug categories state
  useEffect(() => {
    console.log("Categories updated:", categories);
  }, [categories]);

  useEffect(() => {
    if (searchBtn === "menu") {
      handleSearchMenus();
      setRestaurantResult(null);
    } else if (searchBtn === "restaurant") {
      handleSearchRestauant();
      setSearchResult(null);
    }
  }, [searchBtn]);

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-md mx-auto p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-2 mb-4 bg-white rounded-full shadow-md p-2">
          <Link to="" className="p-2">
            <svg
              className="w-6 h-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <input
            type="text"
            className="w-full bg-transparent focus:outline-none"
            placeholder="Search your desired foods or restaurants"
            onChange={handleOnChange}
            value={search}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Suggestions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-3 flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Sub Burger regular"
                className="w-12 h-12 rounded"
              />
              <div className="text-sm font-medium">Sub Burger regular</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Chicken Burger (Small)"
                className="w-12 h-12 rounded"
              />
              <div className="text-sm font-medium">Chicken Burger (Small)</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Fried Chicken"
                className="w-12 h-12 rounded"
              />
              <div className="text-sm font-medium">Fried Chicken</div>
            </div>
            <div className="bg-orange-100 rounded-lg shadow-md p-3 flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Special Set Menu"
                className="w-12 h-12 rounded"
              />
              <div className="text-sm font-medium">Special Set Menu</div>
            </div>
          </div>
        </div>

        {/* Popular Categories Section */}
        {/* <div>
          <h2 className="text-xl font-semibold mb-2">Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name}`}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div> */}
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-2 gap-2 w-4/5 mx-auto">
        <button
          className={
            searchBtn === "menu"
              ? `px-2 py-1 border-b-2 text-center lowercase bg-yellow-300 `
              : `px-2 py-1 border-b-2 text-center lowercase`
          }
          onClick={() => setSearchBtn("menu")}
        >
          Menu
        </button>
        <button
          className={
            searchBtn === "restaurant"
              ? `px-2 py-1 border-b-2 text-center lowercase bg-yellow-300 `
              : `px-2 py-1 border-b-2 text-center lowercase`
          }
          onClick={() => setSearchBtn("restaurant")}
        >
          Restaurant
        </button>
      </div>

      {/* result */}
      <div
        className={`grid w-[92%] mx-auto px-3 py-4 ${searchBtn === "restaurant" ? "grid-cols-1" : "grid-cols-2"} gap-3 md:grid-cols-3 lg:grid-cols-5`}
      >
        {loading ? (
          <div className="w-full py-12 flex items-center justify-center">
            {" "}
            <Loading />{" "}
          </div>
        ) : null}
        {console.log(searchResult?.length)}

        {searchResult &&
          searchResult.map((item, index) => {
            return <MenuCard detail={item} key={index} />;
          })}

        {searchBtn === "restaurant" && restaurantResult
          ? restaurantResult.map((item, index) => {
              return <RestaurantCard detail={item} key={index} />;
            })
          : null}
      </div>
    </div>
  );
};

export default SearchPage;
