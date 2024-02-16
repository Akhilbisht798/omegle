const configuration = { configuration: { offerToReceiveAudio: true, offerToReceiveVideo: true },'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

class Webrtc {
	peer: RTCPeerConnection
	constructor() {
		this.peer = new RTCPeerConnection(configuration);
		this.peer.onicecandidate = e => {
			console.log("New Ice Candidate! reprinting SPD " + JSON.stringify(this.peer.localDescription));
		}
		const dc = this.peer.createDataChannel('channel')
	}

	async createOffer() {
		const offer = await this.peer.createOffer();
		await this.peer.setLocalDescription(offer);
		console.log("Set Successfully.");
	}

	async onOffer(offer: RTCSessionDescription) {
		await this.peer.setRemoteDescription(offer)
		const answer = await this.peer.createAnswer()
		await this.peer.setLocalDescription(answer)

	}
	
	async onAnswer(answer: RTCSessionDescription) {
		await this.peer.setRemoteDescription(answer)
	}
}

const peerConnection = new Webrtc();

export default peerConnection;
