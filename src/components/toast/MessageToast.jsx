import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketIo";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function MessageToast() {
  const socket = useSocket();
  const [message, setMessage] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("sendSmsToUser", (data) => {
        console.log(data);
        const parseData = JSON.parse(data);

        setMessage(parseData);
        setIsActive(true);
      });
    }

    if (socket) {
      socket.on("recieveSMSfromRestaurant", (data) => {
        console.log(data);
        const parseData = JSON.parse(data);

        setMessage(parseData);
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
        <div className="fixed top-20 right-4 z-50" onClick={handleClose}>
          <div className="flex items-center bg-white border shadow-lg px-4 py-2 ">
            <Link to={"/order/active"} className="flex-1">
              <span className="font-bold text-black">{message.sender}</span>:{" "}
              {message.message}
            </Link>
            <RxCross2
              className="text-red-700 cursor-pointer text-lg ml-4 hover:text-red-500"
              onClick={handleClose}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
