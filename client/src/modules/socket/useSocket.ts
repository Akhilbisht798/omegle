import { useEffect } from "react";
import socket from "./socket";
import peerConnection from "../webrtc";
import { useRoom } from "../roomState";

const useSocket = () => {
    // @ts-ignore
    const { changeRoom } = useRoom();
    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log(socket.id, " client connected");
        })
        socket.on('get-roomId',async (data) => {
            // { caller, roomId} - if caller true, create offer.
            console.log("roomId - ", data);
            socket.emit('join-room', data.roomId);
            changeRoom(data.roomId);
            if (data.caller) {
                const offer = await peerConnection.createOffer();
                socket.emit('send-offer', { sdp :offer, room: data.roomId })
            }
        });
        // getting offer and sending answer
        socket.on('on-offer', async (data) => {
            const answer = await peerConnection.onOffer(data.sdp)
            socket.emit('send-anser', {answer, room: data.room })
        })
        //getting answer and setting it remote desc
        socket.on('on-answer', async (data) => {
            await peerConnection.onAnswer(data.answer)
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
