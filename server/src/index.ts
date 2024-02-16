import express from 'express'
const app = express();
import http from 'http'
const server = http.createServer(app);
import { Server } from 'socket.io';
require('dotenv').config()

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
	// @ts-ignore
	cors: clientUrl
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send("<h1>Omegle Clone</h1>")
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
	console.log(`[server] running at http://localhost:${port}`);
})
