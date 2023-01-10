const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: {origin: "http://localhost:3000", methods: ["GET", "POST"]}});

var cors = require('cors')

app.use(cors())

io.on('connection', (socket) => {
  console.log(":)")
  socket.on("setRoom", (roomId) => {
    socket.join(roomId)
  })

  socket.on('message', (message) => {
    socket.broadcast.emit(message)
  });
});

server.listen(4003, () => {
  console.log('listening on *:4003');
});