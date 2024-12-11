import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { MdOutlineNotificationsOff } from "react-icons/md";
import { api_path_url, authToken } from "../secret";
import { IoIosNotifications } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useParams, Link } from "react-router-dom";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(null);

  const { type } = useParams();

  // API
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${api_path_url}/notification/notifications`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          },
        );

        if (data.success) {
          setNotifications(data.notifications);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchPromotionNotification = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${api_path_url}/notification/notifications/promotion`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          },
        );

        if (data.success) {
          setNotifications(data.notifications);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        console.error("Error fetching notifications:", error);
      }
    };

    if (type === "all") {
      fetchNotifications();
    } else if (type === "promotion") {
      fetchPromotionNotification();
    }
  }, [type]);

  return (
    <div className="">
      <Header title="Notification" />

      <div className="pt-20"></div>

      <div className="px-4 flex items-center gap-4">
        <Link
          to={"/notification/all"}
          className={`px-4 py-1 border rounded-md ${type === "all" ? "bg-red-500 text-white" : "bg-white text-black"}`}
        >
          All
        </Link>
        <Link
          to={"/notification/promotion"}
          className={`px-4 py-1 border ${type === "promotion" ? "bg-red-500 text-white" : "bg-white text-black"} rounded-md`}
        >
          Promotion
        </Link>
      </div>

      {/* Notification Empty Message */}
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
                <MdOutlineNotificationsOff className="h-16 w-16 text-blue-700" />
              </div>
            </div>
            <p className="text-gray-600">Your notification is empty.</p>
          </div>
        </div>
      ) : (
        // Notification Card
        notifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))
      )}
    </div>
  );
};

//  NotificationCard (NotificationCard.js)
const NotificationCard = ({ notification }) => {
  const { date, title, description, time, imageUrl } = notification;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="border-b p-2 shadow-lg rounded-lg cursor-pointer mt-2 border max-w-[90%] mx-auto"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      <p className="text-gray-500 text-sm mb-1">{date}</p>
      <div className="flex items-start">
        <div className="mr-4">
          <div className="bg-gray-300 p-2 rounded-full">
            <IoIosNotifications className="text-2xl" />
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-600">
            {truncateText(title, 30)}
          </h3>
          <p className="text-gray-400 text-[12px] ">
            {truncateText(description, 180)}
          </p>
          <p className="text-gray-500 text-sm mt-1">{time}</p>
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="notification"
            className="w-12 h-12 object-cover rounded-md ml-2"
          />
        )}
      </div>

      {isModalOpen ? (
        <NotificationModal
          title={title}
          description={description}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      ) : null}
    </div>
  );
};

function NotificationModal({ title, description, setIsModalOpen }) {
  return (
    <>
      <div className="w-full h-screen absolute z-50 top-0 left-0 bg-[#00000042] flex items-center justify-center">
        {/* Add relative positioning to the parent */}
        <div className="relative bg-white rounded-lg p-4 py-8 shadow-lg w-4/5">
          {/* Position the icon in the top-right corner of the parent */}
          <RxCross1
            className="absolute top-2 right-2 cursor-pointer text-red-600 hover:text-gray-700"
            onClick={() => {
              setIsModalOpen(false); // Explicitly close the modal
            }}
          />
          <div className="text-lg flex items-center   gap-4 text-gray-700 font-extrabold">
            <span className="px-1 py-1 bg-gray-400 rounded-full">
              <IoIosNotifications className="text-lg" />
            </span>
            <h1 className="text-lg flex   gap-4 text-gray-700 font-extrabold">
              {title}
            </h1>
          </div>
          <h1 className="text-sm text-gray-600">{description}</h1>

          <button
            className="w-full font-extrabold mx-auto px-2 py-1 text-white bg-red-500 rounded-full inline-block mt-4"
            onClick={() => {
              setIsModalOpen(false); // Explicitly close the modal
            }}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
}

export default Notification;
