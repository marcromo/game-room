import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useChatSocket(
  roomId: string | undefined,
  chatId: string | undefined,
  onMessage: (msg: any) => void,
  onPresence?: (data: any) => void,
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!roomId || !chatId) return;
    const token = localStorage.getItem("token") || undefined;
    const socket = io("http://localhost:3001", {
      path: "/socket.io",
      transports: ["websocket"],
      auth: { token },
      autoConnect: true,
      reconnection: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[SOCKET] Connected", socket.id);
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId")
          : undefined;
      if (userId && roomId) {
        socket.emit("joinRoom", { roomId, userId });
        console.log("[SOCKET] joinRoom emitido", { roomId, userId });
      } else {
        console.warn(
          "[SOCKET] joinRoom NO emitido: userId o roomId no definido",
          { roomId, userId },
        );
      }
    });
    socket.on("disconnect", () => {
      console.log("[SOCKET] Disconnected");
    });

    // Escuchar nuevos mensajes
    socket.on("chat:new-message", (msg) => {
      console.log("[SOCKET] chat:new-message recibido", msg);
      onMessage(msg);
    });

    // Escuchar presencia en tiempo real
    socket.on("room:presence", (data) => {
      console.log("[SOCKET] room:presence evento crudo", data);
      if (onPresence) onPresence(data);
    });

    return () => {
      if (socket.connected) {
        const userId =
          typeof window !== "undefined"
            ? localStorage.getItem("userId")
            : undefined;
        if (userId && roomId) {
          socket.emit("leaveRoom", { roomId, userId });
        } else {
          console.warn(
            "[SOCKET] leaveRoom NO emitido: userId o roomId no definido",
            { roomId, userId },
          );
        }
      }
      socket.off("chat:new-message");
      socket.off("room:presence");
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [roomId, chatId]);
}
