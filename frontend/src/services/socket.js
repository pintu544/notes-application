import { io } from "socket.io-client";
import {
  NOTE_CREATE_SOCKET,
  NOTE_UPDATE_SOCKET,
  NOTE_DELETE_SOCKET,
} from "../constants/notesConstants";

export const SOCKET_CONNECTION_STATE = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
};

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  (process.env.NODE_ENV === "production"
    ? window.location.origin
    : "http://localhost:5000");

const socket = io(SOCKET_URL, {
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Socket connected!");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

let storeRef;
export const setStoreRef = (store) => {
  storeRef = store;
};

// Socket event handlers
socket.on("notes:create", (note) => {
  if (storeRef) {
    storeRef.dispatch({
      type: NOTE_CREATE_SOCKET,
      payload: note,
    });
  }
});

socket.on("notes:delete", (note) => {
  if (storeRef) {
    storeRef.dispatch({
      type: NOTE_DELETE_SOCKET,
      payload: note,
    });
  }
});

socket.on("notes:update", (note) => {
  if (storeRef) {
    storeRef.dispatch({
      type: NOTE_UPDATE_SOCKET,
      payload: note,
    });
  }
});

export const connectSocket = (userId) => {
  if (userId) {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("join", userId);
    console.log(`Joined room for user: ${userId}`);
    return true;
  }
  return false;
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    return true;
  }
  return false;
};

export const getConnectionStatus = () => {
  return socket.connected
    ? SOCKET_CONNECTION_STATE.CONNECTED
    : SOCKET_CONNECTION_STATE.DISCONNECTED;
};

export default socket;
