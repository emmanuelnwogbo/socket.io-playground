const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
//server explicitly created for the intention of
//passing it to the io function
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
  console.log('new websocket connection');

  socket.on('increment', () => {
    //console.log('increment');
    count+=1;
    //socket.emit('countUpdated', count);
    io.emit('countUpdated', count);
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});