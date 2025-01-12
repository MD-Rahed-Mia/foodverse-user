import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function HomeAddress() {
  const { user, currentAddress, setCurrentAddress } = useAuth();
  const [address, setAddress] = useState(null);
  const [firstElement, setFirstElement] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (user) {
      setAddress(user.address);
    }
  }, [user]);


  useEffect(() => {
    if (address) {
      const fE = Object.keys(address)[0];
      setFirstElement(fE);
      setSelectedAddress(fE);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      if (currentAddress === null) {
        const defaultAddress = address[firstElement];
        setCurrentAddress(defaultAddress);
      }
    }
  }, [firstElement]);

  // Handle selection of address
  const handleAddressSelection = (e) => {
    setSelectedAddress(e.target.value);
    setCurrentAddress(address[e.target.value])
    setIsModalOpen(!isModalOpen);
  };


  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(!isModalOpen);
    }, 20000);
  }, [])

  return (
    <>
      <div className="flex items-center gap-3 w-full justify-between pr-8" onClick={() => setIsModalOpen(!isModalOpen)}>
        <div className="flex items-center gap-3 text-white">
          <FaLocationDot />
          <h1>
            {
              currentAddress && currentAddress.address
            }

          </h1>
        </div>
        <div>
          <FaChevronDown className="text-xl text-white" />
        </div>
      </div>

      {/* Modal or dropdown for selecting an address */}
      {
        isModalOpen ? <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50">
          <div className="absolute w-full min-h-[350px] p-8 bg-white bottom-0 left-0">

            <div>
              <ImCross className="absolute top-2 right-2 text-2xl text-orange-600" onClick={() => setIsModalOpen(!isModalOpen)} />
            </div>

            <h1>Please select your address</h1>
            <div>
              {address &&
                Object.keys(address).map((key) => (
                  <div className="border py-2 px-3 mt-2">
                    <div key={key} className="flex items-center gap-2 ">
                      <input
                        type="radio"
                        id={key}
                        name="address"
                        value={key}
                        checked={currentAddress.label === key}
                        onChange={handleAddressSelection}
                      />
                      <label htmlFor={key} className="text-xl">
                        {address[key]?.label || `Label for ${key}`}
                      </label>
                    </div>
                    <div className="ml-8 text-sm text-gray-500 font-semibold">
                      <h1>Name: {address[key]?.name}</h1>
                      <h1>Address: {address[key]?.address}</h1>
                      <h1>Phone : {address[key]?.phoneNumber}</h1>
                    </div>

                  </div>
                ))}
            </div>
          </div>
        </div> : null
      }
    </>
  );
}
