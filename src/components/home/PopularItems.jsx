

import React, { useEffect, useState } from 'react'
import MenuCard from '../MenuCard'
import axios from 'axios';
import { api_path_url, authToken } from '../../secret';
import { useAuth } from '../../contexts/AuthContext';

export default function PopularItems() {

    const [items, setItems] = useState(null);
    const { isFloatingAddressActive, setIsFloatingAddressActive } = useAuth();

    // get popular items
    async function getPopularItems() {
        try {

            const {data} = await axios.get(`${api_path_url}/menu/popular-items`, {
                headers: {
                    "x-auth-token": authToken
                }
            });

            console.log(data)

            if(data.success){
                setItems(data.menuItems)
            }
            
        } catch (error) {
            console.log(error.message)
            return error;

        }
    }


    useEffect(() => {
        getPopularItems()
    }, [])

    useEffect(() => {
        getPopularItems()
    }, [isFloatingAddressActive])


  return (
    <div className='max-w-full flex custom-scrollbar no-scrollbar scroll-smooth py-4 overflow-x-scroll gap-4 px-2'>
    
       {
        items && items.map((item, index) => {
            return <MenuCard detail={item} />
        })
       }
    </div>
  )
}
