import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from "react-icons/fi";
function Favorites() {
  return (
    <div>
      <header className=" bg-gradient-to-r from-purple-200 to-blue-200 p-4 w-full fixed">
        <div className="flex flex-col items-center mb-2 mt-2 justify-between">
          <div className="w-full text-center">
            <span className="font-bold text-blue-700">Favorites</span>
          </div>
        </div>
      </header>
      <main className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          {/* Icon with Heart */}
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
              <FiHeart className="size-16 text-blue-600" />
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet!</h2>
          <p className="text-gray-600">Love any specific restaurant?</p>
          <p className="text-gray-600 mb-6">Save it to save your time.</p>

          {/* Browse Button */}
          <Link to='/list-restaurant' >
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-700">
              See Restaurant
            </button>
          </Link>
        </div>
      </main>

    </div>
  );
}

export default Favorites;
