import { useContext, useEffect, createContext } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SocketProvider({ children }: any) {
  const socket: Socket = io("http://localhost:3001");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
