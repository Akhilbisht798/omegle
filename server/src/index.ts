import express from 'express'
const app = express();
import http from 'http'
const server = http.createServer(app);
import { Server } from 'socket.io';
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
require('dotenv').config()

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors())
app.use(express.json())

const io = new Server(server, {
	// @ts-ignore
	cors: clientUrl
});

const port = process.env.PORT || 3000;

let queue: string[] = [];

app.get('/', (req, res) => {
	res.send("<h1>Omegle Clone</h1>")
})

app.post('/call', (req, res) => {
	console.log(req.body)
	res.send("<h3>Calling.</h3>")
})

io.on('connection', (socket) => {
	socket.on('make-call', (data) => {
		if (queue.length < 1) {
			queue.push(data)
			return
		}
		const peer = queue.shift()
		const roomId = uuidv4()
		socket.broadcast.to(peer as string).emit('get-roomId', roomId)
		socket.emit('get-roomId', roomId)
	});

	socket.on('join-room', (data) => {
		socket.join(data)
		console.log("Joined room ", data, " socket.id ", socket.id)
	})
});

server.listen(port, () => {
	console.log(`[server] running at http://localhost:${port}`);
})
