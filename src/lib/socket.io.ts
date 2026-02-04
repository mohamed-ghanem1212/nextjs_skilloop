// lib/socket.io.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let currentUserId: string | null = null;

export const connectSocket = (userId?: string): Socket => {
  // If user changed, force disconnect old socket
  if (userId && currentUserId && userId !== currentUserId) {
    console.log("🔄 User changed - forcing full disconnect");
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    }
  }

  // Update current user ID
  if (userId) {
    currentUserId = userId;
  }

  // If socket exists and is connected, return it
  if (socket && socket.connected) {
    console.log("♻️ Reusing existing connected socket");
    return socket;
  }

  // If socket exists but is disconnected, reconnect it
  if (socket && !socket.connected) {
    console.log("🔄 Reconnecting existing socket");
    socket.connect();
    return socket;
  }

  // Create new socket instance
  console.log("🆕 Creating new socket instance for user:", userId || "unknown");

  const SOCKET_URL = "http://localhost:5000";

  socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    transports: ["websocket", "polling"],
    // CRITICAL: Send cookies with the socket connection
    withCredentials: true,
    // Force new connection (don't reuse)
    forceNew: true,
  });

  // Connection successful
  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
    console.log("✅ Socket for user:", currentUserId);
  });

  // Connection lost
  socket.on("disconnect", (reason) => {
    console.log("❌ Socket disconnected:", reason);

    // If server disconnected us, try to reconnect
    if (reason === "io server disconnect") {
      socket?.connect();
    }
  });

  // Connection error
  socket.on("connect_error", (error) => {
    console.error("❌ Socket connection error:", error.message);

    // Handle session expiration
    if (
      error.message === "Your session expired" ||
      error.message === "Authentication failed"
    ) {
      console.error(
        "🔐 Authentication failed - session expired or invalid token",
      );
    }
  });

  // Reconnection attempt
  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log(`🔄 Reconnection attempt #${attemptNumber}`);
  });

  // Reconnection successful
  socket.on("reconnect", (attemptNumber) => {
    console.log(`✅ Reconnected after ${attemptNumber} attempts`);
  });

  // Reconnection failed
  socket.on("reconnect_failed", () => {
    console.error("❌ Reconnection failed after all attempts");
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    console.log("🔌 Fully disconnecting socket for user:", currentUserId);
    socket.removeAllListeners();
    socket.disconnect();
    socket.close(); // Force close
    socket = null;
    currentUserId = null;
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const isSocketConnected = (): boolean => {
  return socket?.connected || false;
};

export const getCurrentUserId = (): string | null => {
  return currentUserId;
};
