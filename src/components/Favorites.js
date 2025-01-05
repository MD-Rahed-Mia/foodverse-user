import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from "react-icons/fi";
import { useCartContext } from '../contexts/CartContext';

import axios from "axios"
import { api_path_url, authToken } from '../secret';
import MenuCard from './MenuCard';
import Header from './Header';

function Favorites() {

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(null);


  const { favoriteMenus } = useCartContext();


  async function getFavoriteItems() {
    setLoading(true);
    try {

      const { data } = await axios.post(`${api_path_url}/menu/favorite-items`, {
        list: JSON.stringify(favoriteMenus)
      }, {
        headers: {
          "x-auth-token": authToken
        }
      })


      // console.log(data)

      if (data.success) {
        setLoading(false);
        setItems(data.menu)
      }

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }


  useEffect(() => {
    getFavoriteItems()
  }, [favoriteMenus])

  return (
    <div>
      {/* <header className=" bg-gradient-to-r from-purple-200 to-blue-200 p-4 w-full fixed top-0 left-0">
        <div className="flex flex-col items-center mb-2 mt-2 justify-between">
          <div className="w-full text-center">
            <span className="font-bold text-blue-700">Favorites</span>
          </div>
        </div>
      </header> */}

      <Header title={"Favorite"} />

      <div className='mt-20'></div>

      <div className='w-full px-4  grid grid-cols-2 gap-3'>
        {
          items && items.map((item) => {
            return <MenuCard detail={item} key={item._id} />
          })
        }
      </div>

      {
        loading ? <h1 className=' text-center my-20'>Loading... <br /> Please wait...</h1> : null
      }

      {
        items && items.length === 0 ? <main className="flex items-center justify-center min-h-screen bg-white">
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
        </main> : null
      }




    </div>
  );
}

export default Favorites;
