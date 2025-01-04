import React from 'react'
import { Link } from 'react-router-dom'
import { FaNoteSticky } from "react-icons/fa6";
import { MdPolicy } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";

export default function PolicyContainer() {
  return (
    <div>


      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-purple-600">Terms & Conditions</h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
            <svg
              className="w-6 text-slate-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </li>
          <li className='text-xl pl-2 flex items-center gap-2 text-gray-600 font-bold'>
            <FaCartShopping />
            <Link to={"/shipping-policy"} className='text-[16px] text-black font-normal'>Shipping Policy</Link>
          </li>
          <li className='text-xl pl-2 flex items-center gap-2 text-gray-600 font-bold'>
            <MdPolicy />
            <Link to={"/cancalletion-policy"} className='text-[16px] text-black font-normal'>Cancalletion Policy</Link>
          </li>
          <li className='text-xl pl-2 flex items-center gap-2 text-gray-600 font-bold'>
            <RiRefund2Line />
            <Link to={"/refund-policy"} className='text-[16px] text-black font-normal'>Refund Policy</Link>
          </li>

          <li className='text-xl pl-2 flex items-center gap-2 text-gray-600 font-bold'>
          <FaHandsHelping />
            <Link to={"/help-and-support"} className='text-[16px] text-black font-normal'>Help & Support </Link>
          </li>

        </ul>
      </div>


    </div>
  )
}
