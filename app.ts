import * as http from 'http';
import { Server } from "socket.io";
import { Message } from './models/Message';

const server = http.createServer();
const io = new Server(server, {cors: {origin: "*", methods: ["GET", "POST"]}});

io.on('connection', (socket) => {
  let room: string;

  socket.on("setRoom", (roomId: string) => {
    socket.join(roomId)
    room = roomId;
  })

  socket.on('message', (message: Omit<Message, "date">) => {
    socket.to(room).emit("message", {...message, date: new Date()} as Message);
  });

  socket.on('finish', () => socket.to(room).emit("finish"));
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});