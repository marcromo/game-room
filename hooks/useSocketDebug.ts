// Simple hook para debug de socket.io en el navegador
import { useEffect } from "react";
import { io } from "socket.io-client";

export function useSocketDebug(chatId: string | undefined) {
  useEffect(() => {
    if (!chatId) return;
    const token = localStorage.getItem("token") || undefined;
    const socket = io("http://localhost:3001", {
      path: "/socket.io",
      transports: ["websocket"],
      auth: { token },
    });
    socket.on("connect", () => {
      // eslint-disable-next-line no-console
      console.log("[SOCKET] Connected", socket.id);
      socket.emit("join", { chatId });
    });
    socket.on("chat:new-message", (msg) => {
      // eslint-disable-next-line no-console
      console.log("[SOCKET] chat:new-message", msg);
    });
    socket.on("disconnect", () => {
      // eslint-disable-next-line no-console
      console.log("[SOCKET] Disconnected");
    });
    return () => {
      socket.disconnect();
    };
  }, [chatId]);
}
