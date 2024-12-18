import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { FaDeleteLeft } from "react-icons/fa6";
import { api_path_url, authToken } from "../secret";
import YouMayAlsoLikeCard from "./YouMayAlsoLikeCard";
import Loading from "./Loading";
import Header from "./Header";
import { MdShoppingCart } from "react-icons/md";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";

function Cart() {
  const {
    cart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    cartTotal,
    handleRemoveItem,
    addonTotal,
    discount,
  } = useCartContext();

  // loading
  const [loading, setLoading] = useState(false);

  // addons total
  //  const [addonTotal, setAddonTotal] = useState();

  // special discount
  const [alsoLike, setAlsoLike] = useState(null);

  useEffect(() => {
    const cartRest = localStorage.getItem("cartRest");
    //  console.log(cartRest);
    async function handleFetchAlsoLike() {
      let matchingList = [];

      cart.map((item) => {
        matchingList.push(item._id);
      });

      setLoading(true);
      try {
        const apiResponse = await fetch(
          `${api_path_url}/menu/you-may-like?restaurant-id=${cartRest}`,
          {
            method: "POST",
            headers: {
              "x-auth-token": authToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              excludingItemList: matchingList,
            }),
          }
        );

        const result = await apiResponse.json();
        if (result?.success) {
          setLoading(false);
          setAlsoLike(result?.items);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        //  console.log(error);
        throw new Error("There is an error: ", error.message);
      }
    }
    handleFetchAlsoLike();
  }, []);

  useEffect(() => {}, [cart]);

  return (
    <div className="">
      {/* Header */}
      <Header title={"Cart"} />

      {/* Cart Items */}
      <div className="pt-20 space-y-4 px-4 ">
        {cart.length > 0 &&
          cart?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md relative text-red-500"
            >
              <button
                className="absolute bottom-1 right-3"
                onClick={() => handleRemoveItem(item._id)}
              >
                <FaDeleteLeft />
              </button>
              <img
                src="./img/burger.png "
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="ml-3 flex-grow">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-800">
                  TK {item.offerPrice * item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className=" text-gray-500 rounded-full border-2 border-slate-500 flex items-center justify-center"
                  onClick={() => handleDecreaseQuantity(item._id)}
                >
                  <HiOutlineMinusSm className="size-5" />
                </button>
                <span>{item.quantity}</span>
                <button
                  className=" text-white bg-blue-500 rounded-full  flex items-center justify-center"
                  onClick={() => handleIncreaseQuantity(item._id)}
                >
                  <HiOutlinePlusSm className="size-6 " />
                </button>
              </div>
            </div>
          ))}

        {/* You May Also Like */}

        {loading ? (
          <div className="w-full flex items-center justify-center my-4">
            <Loading />
          </div>
        ) : null}

        {cart.length > 0 ? (
          <>
            <div className=" text-blue-600 font-bold text-xl">
              <div className="flex flex-row items-center justify-center text-center">
                <HiOutlinePlusSm className="size-6 rounded-full border-2 border-blue-600 mr-2" />
                <p>Add more items</p>
              </div>
              <h1 className=" font-bold text-lg text-gray-700 mt-4">
                You may also like
              </h1>
            </div>

            <div className="flex items-center gap-4 flex-nowrap w-full overflow-x-scroll">
              {alsoLike &&
                alsoLike.map((item) => (
                  <YouMayAlsoLikeCard key={item._id} detail={item} />
                ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Order Summary */}

      {cart.length > 0 && (
        <>
          <div className="p-4 bg-white rounded-lg  mb-28">
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Sub total</p>
              <p>TK {cartTotal} </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Discount</p>
              <p>TK {discount}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Addons</p>
              <p>TK {addonTotal}</p>
            </div>
          </div>
          <div className="fixed w-full bottom-0 left-0 bg-white z-50 px-4 pb-4">
            <div className="flex justify-between py-2 font-bold text-xl border-t-2 text-blue-600">
              <p>Subtotal</p>
              <p>TK {cartTotal - discount + addonTotal}</p>
            </div>
            <Link to={`/Checkout`}>
              <button className="bg-blue-500 text-white w-full py-3 rounded-lg mt-2">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
      {/* Empty Cart Message */}
      {cart.length === 0 && (
        <main className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
                <MdShoppingCart className="size-16 text-blue-700" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Are you hungry?
            </h2>
            <p className="text-gray-600">Your cart is empty.</p>
            <p className="text-gray-600 mb-6">Please add items to the menu.</p>

            <Link
              to="/restaurant"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Browse
            </Link>
          </div>
        </main>
      )}
    </div>
  );
}

export default Cart;
