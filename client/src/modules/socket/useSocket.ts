import { useEffect } from "react";
import socket from "./socket";

const useSocket = () => {
    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log(socket.id, " client connected");
        })
        socket.on('get-roomId', (data) => {
            console.log("roomId - ", data);
            socket.emit('join-room', data);
        })
        socket.on('connect_error', (err) => {
            console.log("Error connecting to socket.io", err); 
        });
        return () => {
            socket.off('connect_error');
        }
    }, []);
}

export default useSocket;
