import React, { useState, useRef, useEffect } from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import axios from "axios"; // Import axios
import { api_path_url, authToken } from "../secret";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "home",
    latitude: 22.944039,
    longitude: 90.833783,
    address: "",
    name: "",
    phoneNumber: "",
  });
  const mapRef = useRef(null);

  // loading
  const [loading, setLoading] = useState(null);

  const mapStyles = { height: "300px", width: "100%" };

  // Fetch addresses from backend when the component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      const id = Cookies.get("id");
      setLoading(true);
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/get-address?id=${id}`,
            {
              headers: {
                "x-auth-token": process.env.REACT_APP_API_TOKEN,
              },
            }
          );

          // looping throw address
          const address = response.data.address;
          const arr = [];
          // push address to address array.
          for (const key in address) {
            arr.push(address[key]);
          }
          setAddresses(arr);

          setLoading(false);

          //Address save localStorage
          if (arr.length > 0) {
            localStorage.setItem("userAddress", JSON.stringify(arr[0]));
          }
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching addresses", error);
      }
    };
    fetchAddresses();
  }, []);

  // useEffect(() => {
  //   console.log(newAddress);
  // }, [newAddress]);

  const onMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;
    addCenterMarker();
  };

  const handleMapIdle = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      setNewAddress((prev) => ({
        ...prev,
        latitude: center?.lat(),
        longitude: center?.lng(),
      }));
    }
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const addCenterMarker = () => {
    const centerMarker = document.createElement("div");
    centerMarker.style.background = 'url("/img/Location.png") no-repeat center';
    centerMarker.style.backgroundSize = "contain";
    centerMarker.style.height = "80px";
    centerMarker.style.width = "80px";
    centerMarker.style.position = "absolute";
    centerMarker.style.top = "50%";
    centerMarker.style.left = "50%";
    centerMarker.style.marginTop = "-40px";
    centerMarker.style.marginLeft = "-40px";
    document.getElementById("map").appendChild(centerMarker);
  };

  const resetNewAddress = () => {
    setNewAddress({
      label: "Home",
      lat: 22.944039,
      lng: 90.833783,
      address: "",
      name: "",
      phone: "",
    });
  };

  // API request to update address
  const updateUserAddress = async (updatedAddresses) => {
    try {
      const id = Cookies.get("id");

      //  console.log(newAddress);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update-address?id=${id}`,
        {
          ...newAddress,
        },
        {
          headers: {
            "x-auth-token": process.env.REACT_APP_API_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const renderIcon = (label) => {
    switch (label) {
      case "Home":
        return (
          <svg
            className="h-5 w-5 text-purple-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        );

      case "Office":
        return (
          <svg
            className="h-5 w-5 text-purple-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
              clipRule="evenodd"
            />
          </svg>
        );

      case "Others":
        return (
          <svg
            className="h-5 w-5 text-purple-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  const deleteAddress = async (label) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const apiResponse = await axios.delete(
      `${api_path_url}/user/delete-address?id=${user.id}&label=${label}`,
      {
        headers: {
          "x-auth-token": authToken,
        },
      }
    );

    const data = await apiResponse.data;

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const saveAddress = (e) => {
    e.preventDefault();

    if (newAddress.label === undefined) {
      alert("please select type of address.");
    }

    const confirmEdit = window.confirm(
      `You have already set a ${newAddress.label} address. Do you want to edit it instead?`
    );

    if (confirmEdit) {
      const updatedAddresses = addresses.map((addr) =>
        addr.label === newAddress.label ? newAddress : addr
      );
      setAddresses(updatedAddresses);
      updateUserAddress(updatedAddresses); // Send update to server
      resetNewAddress(); // Reset form
      setShowAddressForm(false);
    }
  };

  // useEffect(() => {
  //   console.log(addresses);
  // }, [addresses]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-md">
        My Address
      </h1>
      {/* Render saved addresses */}
      <div>
        <ul>
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            addresses?.map((addr, index) => {
              return addr.label !== undefined ? (
                <>
                  <div className="border-2 my-4 rounded-md " key={index}>
                    <div className="flex flex-row justify-center items-center p-2 text-blue-600 bg-slate-100 ">
                      <h1 className="font-bold">{addr?.label}</h1>
                    </div>
                    <li className="flex flex-col justify-between items-center p-3  border rounded-md shadow-md ">
                      <div>
                        <div className="flex items-center space-x-2">
                          <svg
                            className="h-5 w-5 text-purple-700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p className="font-bold text-blue-700">Address:</p>
                          <p>{addr?.address}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <svg
                            className="h-5 w-5 text-purple-700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="font-bold text-blue-700">Phone:</p>
                          <p>{addr?.phoneNumber}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* {renderIcon(address.label)}
                  <p className="font-bold text-blue-700">{address.label}:</p> */}
                          <p>
                            {/* {address.address.length > 20
                      ? `${address.address.substring(0, 20)}...`
                      : address.address} */}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row space-x-44 mt-2">
                        <button
                          className="text-white bg-blue-500 rounded-sm font-bold px-2 "
                          onClick={() => {
                            setShowAddressForm(true);
                            setNewAddress(() => ({ ...addr }));
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white bg-red-500 rounded-sm font-bold px-2"
                          onClick={() => deleteAddress(addr?.label)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  </div>
                </>
              ) : null;
            })
          )}
        </ul>
        <div className="text-center">
          <Link
            to={"/setaddressmanager"}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 "
            onClick={() => setShowAddressForm(true)}
          >
            + Add Another Address
          </Link>
        </div>
      </div>

      {showAddressForm && (
        <form
          onSubmit={saveAddress}
          className="border-2 p-2 my-4 rounded-md bg-gray-100 "
        >
          <label className="block text-sm mb-2">Label</label>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                newAddress.label === "home"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setNewAddress({ ...newAddress, label: "home" })}
            >
              Home
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                newAddress.label === "office"
                  ? "bg-blue-400 text-white "
                  : "bg-gray-200"
              }`}
              onClick={() => setNewAddress({ ...newAddress, label: "office" })}
            >
              Office
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                newAddress.label === "others"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setNewAddress({ ...newAddress, label: "others" })}
            >
              Others
            </button>
          </div>

          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={newAddress.name}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md mb-4"
            placeholder="Enter your name"
            required
          />

          <label className="block text-sm mb-2">Phone</label>
          <input
            type="text"
            name="phoneNumber"
            value={newAddress.phoneNumber}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md mb-4"
            placeholder="Enter your phone number"
            required
          />

          <label className="block text-sm mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={newAddress.address}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md mb-4"
            placeholder="Enter address details"
            required
          />
          <div className="text-center">
            <button className="font-bold text-white bg-blue-500 p-2 rounded-md">
              Find location
            </button>
          </div>
          {showAddressForm && (
            <LoadScript googleMapsApiKey="AIzaSyBbE_BV395ODtFKApBX_oK0KselqP0Tjcs">
              <GoogleMap
                id="map"
                mapContainerStyle={mapStyles}
                center={{ lat: newAddress.lat, lng: newAddress.lng }}
                zoom={16}
                onLoad={onMapLoad}
                onIdle={handleMapIdle}
              />
            </LoadScript>
          )}

          <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
            <h2 className="text-lg font-semibold">Selected Coordinates:</h2>
            <p>
              Latitude: {newAddress.latitude}, Longitude: {newAddress.longitude}
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4"
          >
            Save Location
          </button>
        </form>
      )}
    </div>
  );
};

export default AddressManager;
