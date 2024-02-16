import { useEffect } from "react"
import peerConnection from "./modules/webrtc"
import useSocket from "./modules/socket/useSocket";

function App() {
  useSocket();
  useEffect(() => {
    peerConnection.createOffer();
  }, [])
  return (
    <>
      <div>Omegle</div>
    </>
  )
}

export default App
