import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketIo";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function OrderToast() {
  const socket = useSocket();
  const [message, setMessage] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("sendPickUpToUser", (data) => {
        // const parseData = JSON.parse(data);
        //  console.log(parseData);

        // setMessage(parseData);
        setMessage(`user order has been pickup.`);
        setIsActive(true);
      });
    }

    // drop notification from rider
    if (socket) {
      socket.on("sendDropResponseToUser", (data) => {
        console.log(data);

        // setMessage("Parcel has been pickup by rider.");
        // const parseData = JSON.parse(data);

        // setMessage(parseData);
        setMessage("Order has been delivered.");
        setIsActive(true);
      });
    }

    // drop notification from rider
    if (socket) {
      socket.on("notifyParcelIsReadyForPickupFromServer", (data) => {
        console.log(data);

        setMessage("Your parcel is ready for pickup.");
        // const parseData = JSON.parse(data);

        // setMessage(parseData);
        //  setMessage("Order has been delivered.");
        setIsActive(true);
      });
    }
  }, [socket]);

  const handleClose = () => {
    setIsActive(false);
  };

  return (
    <>
      {isActive ? (
        <div className="fixed top-40 right-4 z-50" onClick={handleClose}>
          <div className="flex items-center bg-red-500 min-h-12 w-[200px]  shadow-lg px-4 py-2 rounded-tl-full rounded-bl-full ">
            <Link className="flex-1">
              <span className="font-bold">{message}</span>
            </Link>
            <RxCross2
              className="text-white cursor-pointer text-lg ml-4 hover:text-red-500"
              onClick={handleClose}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
