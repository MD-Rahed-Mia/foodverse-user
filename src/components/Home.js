import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_path_url, authToken } from "../secret";

import Footer from "../Layout/Footer";

import {
  HiLocationMarker,
  HiOutlineBell,
  HiOutlineSearch,
} from "react-icons/hi";
import { FaMapLocationDot } from "react-icons/fa6";
import CategorySection from "./Category/CategorySection";
import HomeAddress from "./address/HomeAddress";
import PopularItems from "./home/PopularItems";
import NearByFoods from "./home/NearByFoods";
import NearByRestaurant from "./home/NearByRestaurant";
import BestDeals from "./home/BestDeals";
import AddressComponent from "./home/AddressComponent";
import { useAuth } from "../contexts/AuthContext";
import RestaurantScroller from "./home/RestaurantScroller";

function Home() {

  const [isAddressAvailable, setIsAddressAvailable] = useState(null);

  const { user } = useAuth();

  const ads = [
    { src: "./img/Add1.jpg", alt: "Ad 1" },
    { src: "./img/Add2.jpg", alt: "Ad 2" },
    { src: "./img/Add1.jpg", alt: "Ad 3" },
    { src: "./img/Add2.jpg", alt: "Ad 4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Variables to track swipe
  let touchStartX = 0;
  let touchEndX = 0;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + ads.length) % ads.length);
  };

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); // Always move to the next slide
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle touch events
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX; // Starting X position
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX; // Updating X position
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum swipe distance
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > swipeThreshold) {
      nextSlide(); // Swipe left for the next slide
    } else if (swipeDistance < -swipeThreshold) {
      prevSlide(); // Swipe right for the previous slide
    }
  };


  if (!isAddressAvailable) {
    return <> <div className="bg-red-500 w-full fixed z-10">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 pb-8 px-4 flex items-center justify-between">

        {/*  */}
        {/* Notification Icon */}
        <div>
          <Link to="/notification/all">
            <HiOutlineBell className="size-6 text-white" />
          </Link>
        </div>
      </header>

      {/* SearchBar */}
      <section className="relative">
        <div className="absolute -top-6 w-full px-4">
          <Link to="/SearchBar">
            <input
              type="text"
              className="w-full shadow-md rounded-full pl-10 pr-4 py-3 text-blue-600 placeholder-blue-700 bg-white focus:outline-none"
              placeholder="Are you hungry !!"
            />
            <HiOutlineSearch className="size-5 absolute left-7 top-3 text-purple-600 " />
          </Link>
        </div>
      </section>
    </div>


      <AddressComponent isAddressAvailable={isAddressAvailable} setIsAddressAvailable={setIsAddressAvailable} />
    </>
  }

  return (
    <>
      <div className="bg-white">
        {/* Header section */}
        <div className="bg-red-500 w-full fixed z-10">
          <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 pb-8 px-4 flex items-center justify-between">

            <HomeAddress />
            {/* Notification Icon */}
            <div>
              <Link to="/notification/all">
                <HiOutlineBell className="size-6 text-white" />
              </Link>
            </div>
          </header>

          {/* SearchBar */}
          <section className="relative">
            <div className="absolute -top-6 w-full px-4">
              <Link to="/SearchBar">
                <input
                  type="text"
                  className="w-full shadow-md rounded-full pl-10 pr-4 py-3 text-blue-600 placeholder-blue-700 bg-white focus:outline-none"
                  placeholder="Are you hungry !!"
                />
                <HiOutlineSearch className="size-5 absolute left-7 top-3 text-purple-600 " />
              </Link>
            </div>
          </section>
        </div>

        <div>
          {/* Slider section */}
          <section className="px-3 py-1">
            <div
              className="relative w-full max-w-lg mx-auto mt-28 overflow-hidden rounded-lg shadow-lg"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {ads.map((ad, index) => (
                  <div key={index} className="min-w-full">
                    <img
                      src={ad.src}
                      alt={ad.alt}
                      className="w-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Popular cuisines */}
          <section className="p-3">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-purple-600">
                Popular Category
              </h2>
              <Link
                to="/category"
                className="text-blue-600 font-semibold hover:underline"
              >
                See All
              </Link>
            </div>

            <CategorySection />
          </section>
        </div>


        {/* <AddressComponent isAddressAvailable={isAddressAvailable} setIsAddressAvailable={setIsAddressAvailable} /> */}

        {/* popular items */}

        <div className="w-full my-3 mb-3">
          <h1 className="text-lg px-4 font-semibold">Popular Items</h1>
          <PopularItems />
        </div>


        <div className="w-full my-3 mb-3">
          <h1 className="text-lg px-4 font-semibold">Near by restaurant</h1>
          <NearByRestaurant />
        </div>

        <div className="w-full my-3 mb-3">
          <h1 className="text-lg px-4 font-semibold">Best deals</h1>
          <BestDeals />
        </div>

        <div className="w-full my-3 mb-3">
          <h1 className="text-lg px-4 font-semibold">Near by foods</h1>
          <NearByFoods />
        </div>

        <div className="w-full my-3 mb-3">
          <h1 className="text-lg px-4 font-semibold">All Restaurant</h1>
          <RestaurantScroller />

        </div>




        <div className="py-6"></div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
