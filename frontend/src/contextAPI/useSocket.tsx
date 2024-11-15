import { useContext, createContext, useEffect, useState, ReactNode, useMemo } from "react";
import { io as socket, Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    children: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL;

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [io, setIo] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = socket(API_URL);
        setIo(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const socketMemo = useMemo(() => io, [io]);

    return (
        <SocketContext.Provider value={socketMemo}>
            {children}
        </SocketContext.Provider>
    );
};
