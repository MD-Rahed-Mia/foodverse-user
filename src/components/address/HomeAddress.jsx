import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api_path_url, authToken } from "../../secret";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
export default function HomeAddress() {
  const [addressList, setAddressList] = useState(null);

  async function getDeliveryLocationList() {
    const id = Cookies.get("id");
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
        setAddressList(data.address["home"].address);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getDeliveryLocationList();
  }, []);

  return (
    <div>
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
    </div>
  );
}
