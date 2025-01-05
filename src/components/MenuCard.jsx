import React, { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import { FaHeart } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { TbCurrencyTaka } from "react-icons/tb";
import { FiMinus } from "react-icons/fi";
import { FaGift } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { api_path_url, authToken } from "../secret";
import axios from "axios";

export default function MenuCard({ detail }) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState(detail?.addons);
  const [addonValue, setAddonValue] = useState(0);

  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const [isFavorite, setIsFavorite] = useState(null);

  const { handleAddToFavorite, favoriteMenus, handleRemoveFavorite } = useCartContext();


  //check is loved
  function checkedIsLoved() {
    const index = favoriteMenus.findIndex((item) => detail._id.toString() === item);
    if (index !== -1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }


  useEffect(() => {
    checkedIsLoved()
  }, [favoriteMenus])



  // check delivery charge
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }


  async function calcdeliveryCharge() {
    const cood = JSON.parse(localStorage.getItem("locationCoordinators"));

    if (cood) {
      const result = calculateDistance(cood.lat, cood.long, detail?.restaurantId.coordinator.lat, detail?.restaurantId.coordinator.long);


      try {
        const { data } = await axios.get(
          `${api_path_url}/charges/active-schedule`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );

        // console.log(detail.restaurantId.coordinator);
        //  console.log(data);

        const otherKm = result - 1;

        const charges = data.charges[0].userOthersKMCharge * otherKm + data.charges[0].userFirstKMCharge;

        if (charges < 25) {
          setDeliveryCharge(25);
        } else {

          setDeliveryCharge(charges);
        }

        // console.log(charges)


      } catch (error) {
        console.log(error);
      }
    }

  }

  useEffect(() => {
    calcdeliveryCharge()
  }, [detail])




  // isopen
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    const is = detail?.restaurantId?.isOpen;
    setIsOpen(is);

  }, [detail]);

  const [addonList, setAddonList] = useState([]);

  // handle average food
  function handleFavouriteItems(event) {
    event.stopPropagation();
    handleAddToFavorite(detail._id);
  }

  // handleRemove
  function handleRemoveFavoriteITems(event) {
    event.stopPropagation();

    console.log(`item remove clicked`);
    handleRemoveFavorite(detail._id);
  }


  const [price, setPrice] = useState(quantity * detail?.offerPrice);

  useEffect(() => {
    setPrice((prev) => quantity * detail?.offerPrice);
  }, [quantity, addonValue]);

  const { handleAddToCart } = useCartContext();

  const handleCardClick = () => {
    if (!isOpen) {
      toast.error("currently restaurant is closed.");
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="bg-white w-full min-w-40 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transitioncursor-pointer relative "
        onClick={handleCardClick}
      >
        {/* is open text */}
        <h1 className={`absolute z-50 text-[13px] top-12 right-2  rounded-full bg-red-500 text-white ${isOpen ? "" : "px-4 "}`}>
          {isOpen ? "" : "closed"}
        </h1>
        <img
          src={detail?.image || "/img/burger.png"}
          alt={detail?.name}
          className="w-full h-32 sm:h-48 md:h-56 lg:h-72 object-cover rounded-md"
        />

        {/* discount rate */}
        {detail.discountRate > 0 ? (
          <div className="absolute top-2 left-2 px-3 py-1 bg-pink-500 text-white text-[12px] flex items-center justify-center rounded-full gap-2">
            <span>
              <FaGift />
            </span>{" "}
            <span>upto {detail.discountRate}% off</span>
          </div>
        ) : null}

        {/* Favourite */}
        <FaHeart
          className={`h-8 w-8 cursor-pointer px-2 py-2 rounded-full bg-white ${isFavorite ? "text-red-500" : "text-gray-500"}  absolute right-2 top-2 `}
          onClick={isFavorite ? handleRemoveFavoriteITems : handleFavouriteItems}
        />
        <h3 className="text-sm font-semibold text-gray-800 mx-2 mt-2">
          {detail?.name}
        </h3>


        {/* <h1 className="text-[12px] pl-2">Delivery charge { deliveryCharge.toFixed() } </h1> */}
        {/*  <div>
          <span className="px-2 py-1 rounded-sm bg-orange-100 my-2 inline-block">
            {detail?.category}
          </span>
        </div> */}
        <div className="flex items-center justify-between px-2">
          {/*  <p className="line-through text-orange-500 text-sm">
            TK {detail?.basedPrice}
          </p> */}
          <p className="text-gray-600 my-1 ">TK {detail?.offerPrice}</p>
          <div className="flex items-center justify-between">
            <svg
              className="h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <p className="px-2 font-bold text-gray-700">
              {detail?.averageRating || 4}
            </p>
          </div>
        </div>
        {/* <div>
          <button className="px-3 py-1 bg-blue-600 text-white mx-auto block my-4 rounded-sm">
            add to cart
          </button>
        </div> */}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div
            className={`bg-white p-4 rounded-t-lg w-full transform transition-transform ${showModal ? "translate-y-0" : "translate-y-full"
              }`}
            style={{ transition: "transform 0.3s ease-in-out" }}
          >
            <button
              className="absolute top-2 right-2 text-2xl text-red-600 "
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="flex flex-grow items-center">
              <img
                src={detail?.image || "/img/burger.png"}
                alt={detail?.name}
                className="w-36 h-32 object-cover rounded-md pr-2"
              />
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold text-gray-800 pl-2">
                  {detail?.name}
                </h3>
                <p className="text-blue-400 font-semibold pl-2 py-2 text-sm"></p>
                <div className="flex items-center space-x-2 pl-2">
                  <svg
                    className="h-5 w-5 text-purple-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <span className="px-2 font-bold text-gray-700">
                    {detail?.averageRating}
                  </span>
                </div>
              </div>
            </div>
            <p className="font-semibold text-sm mt-2">Description</p>
            <p className="text-gray-500 mt-1">{detail?.description}</p>
            <div className="flex items-center justify-between mt-4 border-t-2 pt-2 ">
              <p className="font-semibold mt-2">Total Amount:</p>
              <p className="text-gray-800 font-bold">TK {price + addonValue}</p>

            </div>

            {/* addons */}
            <div>
              <MenuAddons
                addons={addons}
                setAddonList={setAddonList}
                addonList={addonList}
                addonValue={addonValue}
                setAddonValue={setAddonValue}
              />
            </div>

            <div className="mt-4 flex flex-row items-center">
              <div className="flex flex-row items-center pr-2">
                <span className="w-8 h-8 text-gray-700 ">
                  <button
                    className="w-8 h-8 rounded-full border-2 border-blue-500 text-blue-500 "
                    onClick={() => {
                      if (quantity <= 1) return false;
                      setQuantity((prev) => prev - 1);
                    }}
                  >
                    -
                  </button>
                </span>
                <span className="font-bold text-xl px-2">{quantity}</span>
                <span>
                  <button
                    className="w-8 h-8 rounded-full bg-blue-500 text-white "
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </span>
              </div>
              <button
                className="bg-blue-500 w-full text-white py-2 rounded-lg"
                onClick={() => {
                  handleAddToCart({
                    ...detail,
                    quantity: quantity,
                    addons: addonList,
                    addonValue: addonValue,
                  });
                  setShowModal(false);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const MenuAddons = ({
  addons,
  addonList,
  setAddonList,
  addonValue,
  setAddonValue,
}) => {
  return (
    <>
      <h1>Addons</h1>
      {addons ? (
        <>
          {addons.map((item, index) => {
            if (item.status) {
              return (
                <AddonItem
                  key={index}
                  item={item}
                  setAddonList={setAddonList}
                  addonList={addonList}
                  addonValue={addonValue}
                  setAddonValue={setAddonValue}
                />
              );
            }
          })}
        </>
      ) : null}
    </>
  );
};

const AddonItem = ({
  item,
  setAddonList,
  addonList,
  addonValue,
  setAddonValue,
}) => {
  function handleOnchange(e, item) {
    //  console.log(e.target.checked);

    if (e.target.checked) {
      // If the item is selected, add it to the addonList
      setAddonList((prev) => [...prev, { ...item, quantity: 1 }]);
      setAddonValue((prev) => prev + item.price);
    } else {
      // If the item is deselected, remove it from the addonList
      const filterAddon = addonList.filter(
        (it) => it._id.toString() === item._id.toString()
      );

      // Update the addonList without the deselected item
      setAddonList(filterAddon);

      // Update the addonValue by subtracting the item's price
      setAddonValue((prev) => prev - item.price);
    }
  }

  return (
    <div className="flex items-center justify-between border py-4  px-3">
      <div className="flex items-center gap-3">
        <div>
          <input
            type="checkbox"
            name="selectedAddon"
            id="selectedAddons"
            onChange={(e) => handleOnchange(e, item)}
          />
        </div>
        <span className="text-sm">{item.title}</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span>
          <TbCurrencyTaka />
        </span>{" "}
        <span>{item.price}</span>
      </div>
    </div>
  );
};
