import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function AddressCarousel({
  addressList,
  setSelectedAddress,
  setSelectedNumber,
  setAddressLabel,
}) {
  const [selectedKey, setSelectedKey] = useState(null);

  return (
    <div>
      <h1 className="font-semibold text-lg mb-4">Select delivery address</h1>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        parallax
      >
        {Object.entries(addressList).map(([key, value]) => {
          const isSelected = selectedKey === key;

          return value.address !== undefined ? (
            <SwiperSlide
              key={key}
              className={`cursor-pointer rounded-md px-2 py-3 ${
                isSelected
                  ? "border-2 border-blue-500"
                  : "border border-gray-300"
              }`}
              onClick={() => {
                setSelectedAddress(value.address);
                setSelectedKey(key);
                setSelectedNumber(value.phoneNumber);
                setAddressLabel(value.label);
              }}
            >
              <div>
                <h1 className="capitalize text-lg font-semibold">{key}</h1>
                <p>Address: {value.address}</p>
              </div>
            </SwiperSlide>
          ) : null;
        })}
      </Swiper>
    </div>
  );
}
