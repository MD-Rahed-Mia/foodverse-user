import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaCircleCheck } from "react-icons/fa6";

export default function AddressCarousel({
  addressList,
  setSelectedAddress,
  setSelectedNumber,
  setAddressLabel,
  setDropCoords,
}) {

  const [selectedKey, setSelectedKey] = useState(null);

  return (
    <div>
      <h1 className="font-semibold text-lg mb-4">Select delivery address</h1>
      <Swiper slidesPerView={1.3} pagination={{ clickable: true }} parallax>
        {Object.entries(addressList).map(([key, value]) => {
          const isSelected = selectedKey === key;

          return value.address !== undefined ? (
            <SwiperSlide
              key={key}
              className={`cursor-pointer max-w-[80%] rounded-md px-2 py-3 ${isSelected
                  ? "border-2 border-blue-500"
                  : "border border-gray-300 "
                }`}
              onClick={() => {
                setSelectedAddress(value.address);
                setSelectedKey(key);
                setSelectedNumber(value.phoneNumber);
                setAddressLabel(value.label);
                setDropCoords({
                  lat: value.latitude,
                  long: value.longitude,
                });
              }}
            >
              <div>
                <h1 className="capitalize text-lg font-semibold">{key}</h1>
                {
                  isSelected ? <div className="absolute top-2 right-2 text-blue-500">
                    <FaCircleCheck />
                  </div> : null
                }
                <p>Address: {value?.address}</p>
              </div>
            </SwiperSlide>
          ) : null;
        })}
      </Swiper>
    </div>
  );
}
