import socket from "./socket/socket";

const configuration = { configuration: { offerToReceiveAudio: true, offerToReceiveVideo: true },'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

class Webrtc {
	peer: RTCPeerConnection
	constructor() {
		this.peer = new RTCPeerConnection(configuration);
		this.peer.onicecandidate = e => {
			// Send this to socket.io room.
			//const sdp = JSON.stringify(this.peer.localDescription)
			//const sdp = this.peer.localDescription
			//if (sdp?.type === 'offer') {
			//	socket.emit('send-offer', { sdp })
			//} 
		}
		this.peer.ontrack = (e) => {
			console.log("connection opened")
			console.log(e.streams)
		}
	}

	async createOffer(): Promise<RTCSessionDescriptionInit> {
		const offer = await this.peer.createOffer();
		await this.peer.setLocalDescription(offer);
		console.log("Set Successfully.");
		return offer;
	}

	async onOffer(offer: RTCSessionDescription): Promise<RTCSessionDescriptionInit> {
		await this.peer.setRemoteDescription(offer)
		const answer = await this.peer.createAnswer()
		await this.peer.setLocalDescription(answer)
		return answer;
	}
	
	async onAnswer(answer: RTCSessionDescription) {
		await this.peer.setRemoteDescription(answer)
		console.log("answer recived and set")
	}
}

const peerConnection = new Webrtc();

export default peerConnection;
