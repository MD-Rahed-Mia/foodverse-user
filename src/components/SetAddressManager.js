import React, { useEffect, useRef, useState } from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

// Utility to calculate distance between two lat/lng points
function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 6371e3; // Earth's radius in meters

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

function SetAddressManager() {
  const [coordinates, setCoordinates] = useState({
    lat: 22.865322,
    lng: 91.097044,
  });


  const [loading, setLoading] = useState(null);

  const [newAddress, setNewAddress] = useState({
    label: "home",
    latitude: 22.865322,
    longitude: 91.097044,
    name: "",
    phoneNumber: "",
    address: "",
  });

  // navigate
  const navigate = useNavigate();

  const [isZone, setIsZone] = useState(null);

  const [isToastShow, setIsToastShow] = useState(false);
  const mapRef = useRef(null);

  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      toast.error("Geolocation not found. Please try again.");
    }
  };

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  const handleMapIdle = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const updatedCoordinates = {
        lat: parseFloat(center.lat().toFixed(6)),
        lng: parseFloat(center.lng().toFixed(6)),
      };

      setCoordinates(updatedCoordinates);
      setNewAddress((prev) => ({
        ...prev,
        latitude: updatedCoordinates.lat,
        longitude: updatedCoordinates.lng,
      }));

      const distance = calculateDistance(
        updatedCoordinates.lat,
        updatedCoordinates.lng,
        22.8653, // Zone center latitude
        91.097 // Zone center longitude
      );

      if (distance > 5500) {
        if (!isToastShow) {
          toast.error("Out of zone. Currently, our service is not available.");
          setIsToastShow(true);
          setIsZone(false);
        }
      } else {
        setIsToastShow(false);
        setIsZone(true);
      }
    }
  };

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance;
    addCenterMarker(); // Ensure the marker is added when the map loads
  };

  const addCenterMarker = () => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container not found!");
      return;
    }

    const existingMarker = document.getElementById("center-marker");
    if (existingMarker) existingMarker.remove(); // Prevent duplicates

    const centerMarker = document.createElement("div");
    centerMarker.id = "center-marker";
    centerMarker.style.background = 'url("/img/Location.png") no-repeat center';
    centerMarker.style.backgroundSize = "contain";
    centerMarker.style.height = "80px";
    centerMarker.style.width = "80px";
    centerMarker.style.position = "absolute";
    centerMarker.style.top = "50%";
    centerMarker.style.left = "50%";
    centerMarker.style.marginTop = "-40px";
    centerMarker.style.marginLeft = "-40px";
    mapContainer.appendChild(centerMarker);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const findLocation = (event) => {
    event.preventDefault();
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapRef.current.setCenter(userLocation);
          setCoordinates(userLocation);
          setLoading(false);
        },
        () => {
          toast.error("Geolocation failed or is not supported by your browser.")
        }
      );
    } else {
      toast.error("Geolocation failed or is not supported by your browser.")
    }
  };


  const { user, setUser } = useAuth();

  const updateUserAddress = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;

      if (newAddress.phoneNumber.length < 11) {
        toast.error("Invalid phone number.")
        return;
      }





      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update-address?id=${userId}`,
        newAddress,
        {
          headers: {
            "x-auth-token": process.env.REACT_APP_API_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        alert("Address updated successfully!");

        
        setUser((prev) => ({ ...prev, address: { ...prev.address, [newAddress.label]: newAddress } }))
        console.log(user)
        navigate("/");

      } else {
        alert("Failed to update address.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserAddress();
        }}
      >
        <h1 className="font-bold text-blue-600 text-xl text-center mb-4">
          Set Your Address
        </h1>
        <div className="flex space-x-4 mb-4 justify-center">
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${newAddress.label === "home"
              ? "bg-blue-400 text-white"
              : "bg-gray-200"
              }`}
            onClick={() =>
              setNewAddress((prev) => ({ ...prev, label: "home" }))
            }
          >
            Home
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${newAddress.label === "office"
              ? "bg-blue-400 text-white"
              : "bg-gray-200"
              }`}
            onClick={() =>
              setNewAddress((prev) => ({ ...prev, label: "office" }))
            }
          >
            Office
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${newAddress.label === "others"
              ? "bg-blue-400 text-white"
              : "bg-gray-200"
              }`}
            onClick={() =>
              setNewAddress((prev) => ({ ...prev, label: "others" }))
            }
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

        <div className="container mx-auto p-4">
          <button
            id="find-location"
            className="bg-blue-500 text-white w-full px-4 py-2 rounded mb-4"
            onClick={findLocation}
          >
            Find Location
          </button>

          {
            loading ? <div className="w-full flex items-center justify-center">
              <Loading />
            </div> : <LoadScript googleMapsApiKey="AIzaSyBbE_BV395ODtFKApBX_oK0KselqP0Tjcs">
              <GoogleMap
                id="map"
                mapContainerStyle={mapStyles}
                center={coordinates}
                zoom={15}
                onLoad={onLoad}
                onIdle={handleMapIdle}
                options={{
                  gestureHandling: "greedy",
                  fullscreenControl: false,
                  streetViewControl: false,
                }}
              ></GoogleMap>
            </LoadScript>
          }

          <div className="bg-white rounded-lg shadow-lg p-4 text-center flex items-center justify-between">
            <p>Lat: {newAddress.latitude.toFixed(6)}</p>
            <p>Long: {newAddress.longitude.toFixed(6)}</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isZone ? false : true}
          className={`${newAddress.label === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600"
            } text-white text-lg disabled:bg-gray-400 font-bold w-full my-3 px-4 py-3 rounded-xl text-center`}
        >
          {!isZone ? "Service Not Available" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default SetAddressManager;
