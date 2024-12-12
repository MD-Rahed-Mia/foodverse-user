import { IoMdAlert } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import ReviewOrder from "../review/ReviewOrder";
import { useSocket } from "../../contexts/SocketIo";
import { BsChatSquareText } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { api_path_url } from "../../secret";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function OrderCard({ detail }) {
  const [addons, setAddons] = useState([]);
  const [isChatboxOpen, setIsChatBoxOpen] = useState(false);
  const [riderChatBoxOpen, setRiderChatBoxOpen] = useState(false);

  const socket = useSocket();

  if (socket) {
    //  console.log("socket is connected.");

    socket.on("recieveMessage", (data) => {
      console.log(data);
    });
  }

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
        <BsChatSquareText
          className="text-2xl mt-4 cursor-pointer "
          onClick={() => setIsChatBoxOpen(true)}
        />
      </div>
      <div>
        {detail.status === "delivered" ? <ReviewOrder detail={detail} /> : null}
      </div>

      <div
        className="px-3 py-1 rounded-full cursor-pointer bg-blue-500 text-white"
        onClick={() => setRiderChatBoxOpen(!riderChatBoxOpen)}
      >
        chat with rider
      </div>

      {detail?.status === "accept by restaurant" && isChatboxOpen ? (
        <ChatBoxWithRestaurant
          setIsChatBoxOpen={setIsChatBoxOpen}
          isChatboxOpen={isChatboxOpen}
          orderId={detail._id}
          restaurantId={detail.restaurantId}
        />
      ) : null}

      {/* {riderChatBoxOpen ? (
        <ChatBoxWithRider
          setRiderChatBoxOpen={setRiderChatBoxOpen}
          riderChatBoxOpen={riderChatBoxOpen}
          orderId={detail._id}
          riderId={detail.riderId}
        />
      ) : null} */}

      {/* <Link to={`/live-chat/${detail.restaurantId}/${detail._id}`}>
        Chat with restaurant
      </Link> */}

      <Link to={`/live-chat-rider/${detail.riderId}/${detail._id}`}>
        Chat with rider
      </Link>
    </div>
  );
}

function ChatBoxWithRestaurant({
  isChatboxOpen,
  setIsChatBoxOpen,
  orderId,
  restaurantId,
}) {
  const [messages, setMessages] = useState([]); // Initialize as an empty array
  const [sms, setSms] = useState("");
  const socket = useSocket();
  const chatBoxRef = useRef(null);

  // Scroll to the bottom of the chat box whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch previous messages when the component mounts
  useEffect(() => {
    async function getChat() {
      try {
        const { data } = await axios.get(
          `${api_path_url}/chat/user/restaurant?id=${orderId}`
        );

        if (data.success) {
          setMessages(data.message); // Populate the messages state
        }
      } catch (error) {
        console.error("Error fetching chat messages: ", error.message);
      }
    }
    getChat();
  }, [orderId]);

  // Listen for incoming messages via socket
  useEffect(() => {
    if (socket) {
      socket.on("recieveMessage", (data) => {
        const parsedData = JSON.parse(data);
        setMessages((prev) => [...prev, parsedData.message]); // Append new message
      });

      // Clean up the listener on unmount
      return () => {
        socket.off("recieveMessage");
      };
    }
  }, [socket]);

  // Handle sending a message
  const sendMessage = () => {
    const id = Cookies.get("id");

    console.log(restaurantId);

    if (!id) {
      console.log("User ID not found.");
      return;
    }

    if (sms.length === 0) {
      return;
    }

    const newMessage = {
      message: sms,
      userId: restaurantId,
      sender: "user",
      orderId,
    };

    if (socket) {
      socket.emit("sendMessage", JSON.stringify(newMessage)); // Emit message
      setMessages((prev) => [...prev, newMessage]); // Optimistically update state
      setSms(""); // Clear input field
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("sendToUserOrRestaurant", (data) => {
        const parseData = JSON.parse(data);
        console.log(parseData);
        setMessages((prev) => [...prev, parseData]);
      });
    }
  }, [socket]);

  return (
    <div className="w-full h-screen fixed z-50 top-0 left-0 flex items-center justify-center bg-[#000042]">
      <div className="relative w-full min-h-screen bg-white rounded-md shadow-lg">
        <div>
          <RxCross1
            className="absolute top-4 right-4 cursor-pointer text-2xl text-red-500"
            onClick={() => setIsChatBoxOpen(!isChatboxOpen)}
          />
        </div>

        <div className="h-screen w-full">
          <h1 className="text-center py-4 text-white w-full bg-blue-500 my-2 text-2xl font-semibold">
            Chat with restaurant
          </h1>

          <div className="flex items-center justify-between h-[90%] w-full border flex-col">
            {/* Messages display */}
            <div
              ref={chatBoxRef}
              className="h-[90%] border w-full overflow-y-scroll relative flex flex-col"
            >
              {messages.map((msg, index) => (
                <span
                  key={index}
                  className={`${
                    msg.sender === "user" ? "text-right " : "text-left "
                  } w-full py-1 px-3 my-1 text-orange-700`}
                >
                  <span
                    className={`${
                      msg.sender === "user"
                        ? "text-right bg-blue-500 text-white"
                        : "text-left bg-blue-300 text-white"
                    } w-full py-1 px-4 my-1 rounded-full text-orange-700`}
                  >
                    {msg.message}
                  </span>
                </span>
              ))}
            </div>

            {/* Input field and send button */}
            <div className="w-full flex items-center justify-between px-3">
              <input
                type="text"
                placeholder="Write a message"
                className="my-1 w-full px-2 py-1 border"
                onChange={(e) => setSms(e.target.value)}
                value={sms}
              />
              <div>
                <IoIosSend
                  className="text-3xl cursor-pointer"
                  onClick={sendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBoxWithRider({
  setRiderChatBoxOpen,
  riderChatBoxOpen,
  orderId,
  riderId,
}) {
  const [messages, setMessages] = useState([]); // Initialize as an empty array
  const [sms, setSms] = useState("");
  const socket = useSocket();
  const chatBoxRef = useRef(null);

  // Scroll to the bottom of the chat box whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch previous messages when the component mounts
  useEffect(() => {
    async function getChat() {
      console.log(orderId);
      try {
        const { data } = await axios.get(
          `${api_path_url}/chat/user/rider/chat?id=${orderId}`
        );

        console.log(data);

        if (data.success) {
          setMessages(data.message); // Populate the messages state
        }
      } catch (error) {
        console.error("Error fetching chat messages: ", error.message);
      }
    }
    getChat();
  }, [orderId]);

  // Listen for incoming messages via socket
  useEffect(() => {
    if (socket) {
      socket.on("sendMessageToRider", (data) => {
        const parsedData = JSON.parse(data);
        setMessages((prev) => [...prev, parsedData.message]); // Append new message
      });

      // Clean up the listener on unmount
      return () => {
        socket.off("sendMessageToRider");
      };
    }
  }, [socket]);

  // Handle sending a message
  const sendMessage = () => {
    const id = Cookies.get("id");

    console.log(riderId);

    if (!id) {
      console.log("User ID not found.");
      return;
    }

    if (sms.length === 0) {
      return;
    }

    const newMessage = {
      message: sms,
      userId: riderId,
      sender: "user",
      orderId,
    };

    if (socket) {
      socket.emit("sendMessageToRider", JSON.stringify(newMessage)); // Emit message
      setMessages((prev) => [...prev, newMessage]); // Optimistically update state
      setSms(""); // Clear input field
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("sendSmsToUser", (data) => {
        const parseData = JSON.parse(data);
        console.log(parseData);
        setMessages((prev) => [...prev, parseData]);
      });
    }
  }, [socket]);

  return (
    <div className="w-full h-screen fixed z-50 top-0 left-0 flex items-center justify-center bg-[#000042]">
      <div className="relative w-full min-h-screen bg-white rounded-md shadow-lg">
        <div>
          <RxCross1
            className="absolute top-4 right-4 cursor-pointer text-2xl text-red-500"
            onClick={() => setRiderChatBoxOpen(!riderChatBoxOpen)}
          />
        </div>

        <div className="h-screen w-full">
          <h1 className="text-center py-4 text-white w-full bg-blue-500 my-2 text-2xl font-semibold">
            Chat with rider
          </h1>

          <div className="flex items-center justify-between h-[90%] w-full border flex-col">
            {/* Messages display */}
            <div
              ref={chatBoxRef}
              className="h-[90%] border w-full overflow-y-scroll relative flex flex-col"
            >
              {messages.map((msg, index) => (
                <span
                  key={index}
                  className={`${
                    msg.sender === "user" ? "text-right " : "text-left "
                  } w-full py-1 px-3 my-1 text-orange-700`}
                >
                  <span
                    className={`${
                      msg.sender === "user"
                        ? "text-right bg-blue-500 text-white"
                        : "text-left bg-blue-300 text-white"
                    } w-full py-1 px-4 my-1 rounded-full text-orange-700`}
                  >
                    {msg.message}
                  </span>
                </span>
              ))}
            </div>

            {/* Input field and send button */}
            <div className="w-full flex items-center justify-between px-3">
              <input
                type="text"
                placeholder="Write a message"
                className="my-1 w-full px-2 py-1 border"
                onChange={(e) => setSms(e.target.value)}
                value={sms}
              />
              <div>
                <IoIosSend
                  className="text-3xl cursor-pointer"
                  onClick={sendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
