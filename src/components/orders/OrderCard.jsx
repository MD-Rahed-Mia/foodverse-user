import { IoMdAlert } from "react-icons/io";
import React, { useEffect, useState } from "react";
import ReviewOrder from "../review/ReviewOrder";

export default function OrderCard({ detail }) {
  const [addons, setAddons] = useState([]);

  // console.log(detail);

  useEffect(() => {
    // Gather all addons from the items
    let allAddons = [];

    // Iterate through items to get addons
    detail?.items.forEach((item) => {
      if (item.addons && item.addons.length > 0) {
        allAddons = [...allAddons, ...item.addons]; // Spread and add all addons
      }
    });

    setAddons(allAddons); // Set the state with all collected addons
  }, [detail]);

  useEffect(() => {
    console.log(addons);
  }, [addons]);

  return (
    <div className="w-[90%] mx-auto  bg-white min-h-[300px] relative shadow-md border rounded-md p-4">
      {/* alert icon */}
      <div className="absolute top-2 right-4 cursor-pointer text-orange-400">
        <IoMdAlert />
      </div>
      <h1 className="text-gray-500 font-bold">
        O.ID- <span className="text-sm ">{detail._id}</span>
      </h1>
      <h1 className="text-gray-500 font-bold">
        Status-{" "}
        <span className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm">
          {detail.status}
        </span>
      </h1>
      <h1 className="text-gray-500 font-bold">
        Payment method- <span>{detail.peymentMethod} </span>
      </h1>
      <h1 className="text-gray-500 font-bold">
        Restaurant- <span>{detail.restaurantLocation} </span>
      </h1>

      <h1 className="text-gray-500 font-bold">
        Delivery- <span>{detail.dropLocation}</span>
      </h1>

      <div>
        <h1>Food list</h1>
        <table className="w-full border">
          <thead>
            <th className="w-full p-2 border font-semibold">SL No</th>
            <th className="w-full p-2 border font-semibold">Item </th>
            <th className="w-full p-2 border font-semibold">Price</th>
            <th className="w-full p-2 border font-semibold">Quantity</th>
            <th className="w-full p-2 border font-semibold">Sub Total</th>
          </thead>

          <tbody>
            {detail?.items.map((item, index) => {
              // console.log(item.addons);

              //

              return (
                <tr key={index}>
                  <td
                    className="p-2 text-center
                     border text-gray-600"
                  >
                    {index + 1}
                  </td>
                  <td
                    className="p-2 text-center
                     border text-gray-600"
                  >
                    {item.name}
                  </td>
                  <td
                    className="p-2 text-center
                     border text-gray-600"
                  >
                    {item.offerPrice}
                  </td>
                  <td
                    className="p-2 text-center
                     border text-gray-600"
                  >
                    {item.quantity}
                  </td>
                  <td
                    className="p-2 text-center
                     border text-gray-600"
                  >
                    {item.quantity * item.offerPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {addons?.length > 0 ? (
          <>
            <h1 className="text-lg font-extrabold mt-3">Addons</h1>
            <table className="w-full border">
              <thead>
                <td className="w-full text-sm text-center border font-semibold">
                  SL No
                </td>
                <td className="w-full text-sm text-center border font-semibold">
                  title
                </td>
                <td className="w-full text-sm text-center border font-semibold">
                  quantity
                </td>
                <td className="w-full text-sm text-center border font-semibold">
                  Price
                </td>{" "}
                <td className="w-full text-sm text-center border font-semibold">
                  Sub total
                </td>
              </thead>

              <tbody>
                {addons?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="w-full text-sm text-center border font-semibold">
                        {index + 1}
                      </td>
                      <td className="min-w-[150px] text-[13px] text-center border font-semibold">
                        {item.title}
                      </td>
                      <td className="w-full text-sm text-center border font-semibold">
                        {item.quantity || 1}
                      </td>
                      <td className="w-full text-sm text-center border font-semibold">
                        {item.price}
                      </td>
                      <td className="w-full text-sm text-center border font-semibold">
                        {item.price * (item.quantity || 1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>{" "}
          </>
        ) : null}
      </div>

      <h1>
        Total Amount- <span>BDT 240</span>
      </h1>
      <h1>
        Discount- <span>BDT 20</span>
      </h1>
      <h1>
        Payable- <span>BDT 220</span>
      </h1>

      <div>
        <ReviewOrder detail={detail}/>
      </div>
    </div>
  );
}
