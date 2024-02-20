import { useEffect, useRef } from "react";
import peerConnection from "./webrtc";
import socket from "./socket/socket";

// User allow for video and we create a sdp. for it.
const LocalVideoStream = () => {
  const localVideoRef = useRef(null);

  // send socket.id
  async function makeCall() {
    try {
      socket.emit('make-call', socket.id)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const initMediaStream = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      localStream.getTracks().forEach(track => {
        peerConnection.peer.addTrack(track, localStream);
      })
    }
    initMediaStream()
  }, [])

  return (
    <div>
      <video id="local" ref={localVideoRef} autoPlay playsInline/>
      <div>
        <button onClick={makeCall}>Call</button>
      </div>
    </div>
  )
}

export default LocalVideoStream;
