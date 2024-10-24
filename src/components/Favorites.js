import React from 'react';
import { Link } from 'react-router-dom';

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet!</h2>
          <p className="text-gray-600">Love any specific restaurant?</p>
          <p className="text-gray-600 mb-6">Save it to save your time.</p>

          {/* Browse Button */}
          <Link to='/restaurant/67093447a54f6efd5909a857' >
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
