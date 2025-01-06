import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api_path_url, authToken } from "../../secret";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { FaLocationArrow } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Use this hook for navigation in React Router v6


export default function HomeAddress() {
  const [addressList, setAddressList] = useState(null);
  const { isFloatingAddressActive, setIsFloatingAddressActive } = useAuth();
  const navigate = useNavigate(); // React Router v6's navigate hook

  // Function to check if all address fields are empty
  function checkIfAddressEmpty(address) {
    return !address.home && !address.office && !address.others;
  }

  async function getDeliveryLocationList() {
    const id = Cookies.get("id");
    const label = localStorage.getItem("selectedLocation");

    try {
      const { data } = await axios.get(
        `${api_path_url}/user/delivery/location?id=${id}`,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (data.success) {
        const addressData = data.address[label]?.address;

       

        if (data.address.office.label === undefined && data.address.home.label === undefined && data.address.others.label === undefined) {
        //  console.log(`currently no address setup. `);
        
        } else {
          setAddressList(addressData)
        }

      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDeliveryLocationList();
  }, []);

  useEffect(() => {
    getDeliveryLocationList();
  }, [isFloatingAddressActive]);

  return (
    <div className="flex items-center gap-3 w-full justify-between pr-8">
      <Link to="/AddressManager">
        <div className="flex items-center">
          {/* Location Icon */}
          <HiLocationMarker className="size-6 text-white" />

          <div className="ml-2 text-white text-sm">
            <span className="block">
              {addressList?.slice(0, 15)}{addressList?.length > 15 ? "...." : null}
            </span>
          </div>
        </div>
      </Link>
      <div
        className="flex text-lg font-bold text-white cursor-pointer items-center"
        onClick={() => setIsFloatingAddressActive(!isFloatingAddressActive)}
      >
        <FaLocationArrow />
        <IoMdArrowDropdownCircle />
      </div>
    </div>
  );
}
