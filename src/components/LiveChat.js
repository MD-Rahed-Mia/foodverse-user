import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Item from "antd/es/list/Item";
import { api_path_url, authToken } from "../secret";
import { useSocket } from "../contexts/SocketIo";

const LiveChatWithRestaurant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);

  // socket
  const socket = useSocket();

  // order id
  const { orderId, userId } = useParams();

  console.log(orderId);

  // Function to append a new message
  const handleOnChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  // Handle sending the message
  const handleSendMessage = () => {
    if (socket) {
      const message = {
        userId: userId,
        message: input,
        sender: "user",
        orderId: orderId,
      };
      socket.emit("sendMessage", JSON.stringify(message));
      setMessages((prev) => [...prev, message]);
      setInput("");

      // if (socket) {
      //   socket.on("messageSentSuccessful", (data) => {
      //     setMessages((prev) => [...prev, message]);
      //   });
      // }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("recieveSMSfromRestaurant", (data) => {
        const parseData = JSON.parse(data);
        console.log(parseData);
        setMessages((prev) => [...prev, parseData]);
      });
    }
  }, [socket]);

  // fetch existing message
  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await axios.get(
          `${api_path_url}/chat/user/restaurant?id=${orderId}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          },
        );

        console.log(data);

        if (data.success) {
          setMessages(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getMessages();
  }, [orderId]);

  // Scroll to the bottom of the chat window when new messages arrive
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("recieveMessage", (data) => {
  //       const parsedData = JSON.parse(data);
  //       setMessages((prev) => [...prev, parsedData.message]); // Append new message
  //     });

  //     // Clean up the listener on unmount
  //     return () => {
  //       socket.off("recieveMessage");
  //     };
  //   }
  // }, [socket]);

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      {/* Fullscreen chat container */}
      <div className="w-full h-full md:max-w-2xl md:h-5/6 bg-white shadow-lg rounded-lg flex flex-col">
        {/* Chat Header */}
        <div className="bg-blue-600 p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Live Chat with Restaurant</h2>
          <Link
            to={"/order/active"}
            className="text-white focus:outline-none"
          >
            {/* Add a logout or close button if needed */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>

        {/* Chat Messages Window */}
        <div
          ref={chatWindowRef}
          className="flex-1 bg-gray-100 p-4 overflow-y-auto"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 mb-3 rounded-lg max-w-xs break-words ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>

        {/* Chat Input and Send Button */}
        <div className="bg-gray-200 p-4 rounded-b-lg">
          <div className="flex items-center">
            <input
              id="chatInput"
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              placeholder="Type your message..."
              value={input}
              onChange={handleOnChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              id="sendButton"
              className="ml-3 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatWithRestaurant;
