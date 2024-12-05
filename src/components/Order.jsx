import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import OrderCard from "./orders/OrderCard";

function Order() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      const id = Cookies.get("id");

      console.log(id);

      // if (!id) return;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/order/list?id=${id}`,
          {
            headers: {
              "x-auth-token": process.env.REACT_APP_API_TOKEN,
            },
          }
        );

        console.log(data);

        if (data.success) {
          setOrders(data.result);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.message);
        }
      }
    }

    fetchOrders();
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-200 to-blue-200 p-4 w-full fixed">
        <div className="flex flex-col items-center mb-2 mt-2 justify-between">
          <div className="w-full text-center">
            <span className="font-bold text-blue-700">My Order</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center flex-col justify-center min-h-screen bg-white">
        {orders?.length === 0 ? (
          <div className="text-center">
            {/* Icon with Cart */}
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
                <HiOutlineShoppingBag className="size-16 text-blue-700" />
              </div>
            </div>

            {/* Text Content */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No order yet!
            </h2>
          </div>
        ) : (
          <h1 className="my-4 text-2xl font-semibold text-gray-400">
            Your orders
          </h1>
        )}

        <div>
          {orders?.length > 0
            ? orders?.map((item, index) => {
                return <OrderCard detail={item} key={index} />;
              })
            : null}
        </div>
      </main>
    </div>
  );
}

export default Order;
