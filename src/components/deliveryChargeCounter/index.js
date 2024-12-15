import React from "react";

export default function index() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">
            Delivery Charge Calculator
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="user-lat"
            >
              User Latitude:
            </label>
            <input
              id="user-lat"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter user latitude"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="user-lon"
            >
              User Longitude:
            </label>
            <input
              id="user-lon"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter user longitude"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="restaurant-lat"
            >
              Restaurant Latitude:
            </label>
            <input
              id="restaurant-lat"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter restaurant latitude"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="restaurant-lon"
            >
              Restaurant Longitude:
            </label>
            <input
              id="restaurant-lon"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter restaurant longitude"
            />
          </div>
          <button
            id="calculate-btn"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Calculate Delivery Charge
          </button>
          <div id="results" className="mt-4 text-center hidden">
            <h2 className="text-lg font-bold text-gray-700">Results:</h2>
            <p className="text-gray-700">
              <span className="font-bold">Distance:</span>{" "}
              <span id="distance"></span> km
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Delivery Charge:</span>{" "}
              <span id="charge"></span> BDT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
