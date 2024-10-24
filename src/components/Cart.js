import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../cart/useCart";
import CartContainer from "./CartContainer";

function Cart() {
  const [items, setItems] = useState([]);

  const { cart } = useCartContext();
  const [subTotal, setSubTotal] = useState(0);
  const [load, setLoad] = useState(null);

  useState(() => {
    setItems(cart);
  }, [cart]);

  useState(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = localCart.reduce((total, currentItem, index) => {
      return total + currentItem.offerPrice * currentItem.quantity;
    }, 0);
    setSubTotal(totalAmount);

    console.log(load);
  }, [load]);

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-200 to-blue-200 p-4 w-full fixed top-0 left-0">
        <div className="flex flex-col items-center mb-2 mt-2 justify-between">
          <div className="w-full text-center">
            <span className="font-bold text-blue-700">My Cart</span>
          </div>
        </div>
      </header>

      {/* Cart Items */}
      <div className="p-4 mt-20 space-y-4 ">
        {items.length === 0 ? (
          <main className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
                  <svg
                    className="h-16 w-16 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25l-2.394-8.978M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Are you hungry?
              </h2>
              <p className="text-gray-600">Your cart is empty.</p>
              <p className="text-gray-600 mb-6">
                Please add items to the menu.
              </p>
              <Link
                to="/menus"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Browse
              </Link>
            </div>
          </main>
        ) : (
          items.map((item) => {
            return (
              <CartContainer
                key={item?._id}
                item={item}
                setLoad={setLoad}
                load={load}
              />
            );
          })
        )}

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="p-4 bg-white rounded-lg mb-28">
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Sub Total</p>
              <p>TK {subTotal} </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Discount</p>
              <p>TK </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Addons</p>
              <p>TK 0.00</p>
            </div>
            <div className="flex justify-between py-2 font-bold text-xl border-t-2 text-blue-600">
              <p>Total</p>
              <p>TK </p>
            </div>
            <div className="fixed w-full bottom-0 left-0 bg-white z-50 px-4 pb-4">
              <button className="bg-blue-500 text-white w-full py-3 rounded-lg mt-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
