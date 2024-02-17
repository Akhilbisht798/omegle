import peerConnection from "./modules/webrtc";
import useSocket from "./modules/socket/useSocket";
import LocalVideoStream from "./modules/video";

function App() {
  useSocket();

  return (
    <>
      <h2>Omegle</h2>
      <LocalVideoStream />
    </>
  )
}

export default App
