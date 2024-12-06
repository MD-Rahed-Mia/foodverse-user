// src/contexts/SocketContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";

// Set your Socket.IO server URL here
const SOCKET_URL = process.env.REACT_APP_SOCKET_SERVER; // Replace with your server URL

// Create a Socket Context
const SocketContext = createContext(null);

// Custom hook to use the socket
export const useSocket = () => {
  return useContext(SocketContext);
};

// SocketProvider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(SOCKET_URL, {
      // Add any options here (e.g., authentication, transport settings, etc.)
      transports: ["websocket"], // Force WebSocket transport
    });

    // On connection established
    socketInstance.on("connect", () => {
      console.log("Connected to the server with id: ", socketInstance.id);
    });

    // On disconnection
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Set the socket instance
    setSocket(socketInstance);

    // Cleanup the socket connection when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
