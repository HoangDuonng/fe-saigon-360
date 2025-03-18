"use client";
import { createContext, useContext, useEffect, useState } from "react";
import WebSocketService from "@/services/websocketService";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

interface WebSocketContextProps {
  webSocket: WebSocketService | null;
}

const WebSocketContext = createContext<WebSocketContextProps>({ webSocket: null });

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [webSocket, setWebSocket] = useState<WebSocketService | null>(null);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    console.log("WS from provider: ", sessionId);
    if (sessionId) {
      const ws = new WebSocketService(
        (message) => {
          console.log("📩 Message from server:", message);
        },
        dispatch
      );

      ws.connect(sessionId);
      setWebSocket(ws);

      return () => {
        console.log("WebSocket disconnected!");
        ws.disconnect(); // Gọi trực tiếp từ ws chứ không phải webSocket
      };
    }
  }, [dispatch]);

  return (
    <WebSocketContext.Provider value={{ webSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
