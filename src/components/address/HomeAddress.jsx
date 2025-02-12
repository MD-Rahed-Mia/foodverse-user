import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";

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

  const handleAddressSelection = (e) => {
    setSelectedAddress(e.target.value);
    setCurrentAddress(address[e.target.value]);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(!isModalOpen);
    }, 20000);
  }, []);

  function handleStart(e, data) {
    // No need to block upward drag explicitly anymore
  }

  function handleDrag(e, data) {
    // Only close the modal when dragging downwards beyond a threshold

    if (data.y < 0) {
      // Prevent the modal from being dragged upwards (keep dragging downward only)
      return false;
    }

    if (data.y > 80) {
      setIsModalOpen(false);
    }
  }

  function handleStop(e, data) {
    // Prevent any action when dragging upwards (do nothing on stop)
    if (data.y < 0) {
      return; // Do nothing on upward dragging
    }
  }

  return (
    <>
      <div
        className="flex items-center gap-3 w-full justify-between pr-8"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="flex items-center gap-3 text-white">
          <FaLocationDot />
          <h1 className="text-[13px]">
            {currentAddress && currentAddress.address.slice(0, 30)}
          </h1>
        </div>
        <div>
          <FaChevronDown className="text-xl text-white" />
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed select-none top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50">
          <Draggable
            axis="y" // Restrict drag to the y-axis
            onStart={handleStart} // Start of dragging
            onDrag={handleDrag} // Handle drag and close modal if dragged downwards
            onStop={handleStop} // Do nothing on stop if dragged upwards
          >
            <div
              className={`absolute w-full h-auto  overflow-hidden bottom-0 p-8 bg-white left-0 transition-all duration-300 ease-in-out `}
            >
              <div className="bg-gray-500 cursor-pointer hover:bg-blue-500 w-20 h-1 rounded-full mx-auto"></div>

              {/* <div>
                <ImCross
                  className="absolute top-2 right-2 text-2xl text-orange-600"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                />
              </div> */}

              <h1>Please select your address</h1>
              <div>
                {address &&
                  Object.keys(address).map((key) => (
                    <div className="border py-2 px-3 mt-2" key={key}>
                      <div className="flex items-center gap-2">
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

              <Link
                to={"/AddressManager"}
                className="mt-4 px-8 py-2 rounded-full bg-blue-500 text-white w-fit block mx-auto"
              >
                Add Location
              </Link>
            </div>
          </Draggable>
        </div>
      ) : null}
    </>
  );
}
