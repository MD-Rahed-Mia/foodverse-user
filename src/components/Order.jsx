import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import OrderCard from "./orders/OrderCard";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";

const orderBtn = [
  {
    title: "active",
  },
  {
    title: "complete",
  },
  {
    title: "review",
  },
];

function Order() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(null);

  const { status } = useParams();

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const id = Cookies.get("id");

      console.log(id);

      // if (!id) return;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/order/status-order?id=${id}&status=${status}`,
          {
            headers: {
              "x-auth-token": process.env.REACT_APP_API_TOKEN,
            },
          },
        );

        console.log(data);

        if (data.success) {
          setOrders(data.result);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [status]);

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

      <div className="pt-[80px] flex items-center justify-center gap-8">
        {orderBtn.map((item, index) => {
          return (
            <Link
              to={"/order/" + item.title}
              key={index}
              className={
                status === item.title
                  ? " px-2 py-1 capitalize bg-blue-500 text-white rounded-md"
                  : "text-gray-700 px-2 py-1 capitalize"
              }
            >
              {item.title}
            </Link>
          );
        })}
      </div>

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

        <div className="relative pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-48">
          {orders?.length > 0 ? (
            orders?.map((item, index) => {
              return <OrderCard detail={item} key={index} />;
            })
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Order;
