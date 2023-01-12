import * as http from 'http';
import { Server } from "socket.io";
import { Message } from './models/Message';

const server = http.createServer();
const io = new Server(server, {cors: {origin: "http://localhost:3000", methods: ["GET", "POST"]}});

io.on('connection', (socket) => {
  socket.on("setRoom", (roomId: string) => {
    socket.join(roomId)
  })

  socket.on('message', (message: Omit<Message, "date">) => {
    socket.emit("message", {...message, date: new Date()} as Message);
  });
});

server.listen(4003, () => {
  console.log('listening on *:4003');
});