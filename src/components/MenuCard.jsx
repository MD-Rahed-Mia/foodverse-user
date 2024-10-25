import React, { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";

export default function MenuCard({ detail, restaurant }) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState(quantity * detail?.offerPrice);

  useEffect(() => {
    setPrice(quantity * detail?.offerPrice);
  }, [quantity]);

  const { handleAddToCart } = useCartContext();

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={detail?.image || "/img/burger.png"}
          alt={detail?.name}
          className="max-w-32  h-32 sm:h-48 py-3 px-1 object-cover mx-auto block"
        />
        <h3 className="text-sm font-semibold text-gray-800 mx-2 mt-2">
          {detail?.name}
        </h3>
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
            <p className="px-2 font-bold text-gray-700">4.3</p>
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
            className={`bg-white p-4 rounded-t-lg w-full transform transition-transform ${
              showModal ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ transition: "transform 0.3s ease-in-out" }}
          >
            <button
              className="absolute top-2 right-2 text-red-600 "
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
                <p className="text-blue-400 font-semibold pl-2 py-2 text-sm">
                  {restaurant.name}
                </p>
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
                  <span className="px-2 font-bold text-gray-700">4.7</span>
                </div>
              </div>
            </div>
            <p className="font-semibold text-sm mt-2">Description</p>
            <p className="text-gray-500 mt-1">{detail?.description}</p>
            <div className="flex items-center justify-between mt-4 border-t-2 pt-2 ">
              <p className="font-semibold mt-2">Total Amount:</p>
              <p className="text-gray-800 font-bold">TK {price}</p>
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
                  handleAddToCart({ ...detail, quantity: quantity });
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
