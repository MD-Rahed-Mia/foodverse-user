import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api_path_url, authToken } from "../../secret";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { FaLocationArrow } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";


export default function HomeAddress() {
  const [addressList, setAddressList] = useState(null);


  


  const { isFloatingAddressActive, setIsFloatingAddressActive } = useAuth();



  async function getDeliveryLocationList() {
    const id = Cookies.get("id");
    
    const label = localStorage.getItem("selectedLocation")

    try {
      const { data } = await axios.get(
        `${api_path_url}/user/delivery/location?id=${id}`,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      console.log(data);

      if (data.success) {
        setAddressList(data.address[label].address);
      }
    } catch (error) {
      throw new Error(error);
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
              {/* {userAddress && userAddress.address ? userAddress.address :*/}{" "}
              {addressList}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex text-lg font-bold text-white cursor-pointer items-center " onClick={() => setIsFloatingAddressActive(!isFloatingAddressActive)}>
        <FaLocationArrow />
        <IoMdArrowDropdownCircle />
      </div>
    </div>
  );
}
