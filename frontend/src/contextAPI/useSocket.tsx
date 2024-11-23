import { useContext, createContext, useEffect, useState, ReactNode, useMemo } from "react";
import { io as socket, Socket } from "socket.io-client";

type SocketContextType = { socket: Socket | null; currentSocketId: string | null };

const SocketContext = createContext<SocketContextType>({ socket: null, currentSocketId: null });

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    children: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL;

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socketIo, setsocketIo] = useState<Socket | null>(null);
    const [currentSocketId, setSocketId] = useState<string | null>(null);

    useEffect(() => {
        const newSocket = socket(API_URL);
        setsocketIo(newSocket);


        newSocket.on("connect", () => {
            if (newSocket.id) {

                setSocketId(newSocket.id);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const socketMemo = useMemo(() => ({ socket: socketIo, currentSocketId }), [socketIo, currentSocketId]);

    return (
        <SocketContext.Provider value={socketMemo}>
            {children}
        </SocketContext.Provider>
    );
};
