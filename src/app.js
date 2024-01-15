const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const stream = require('./ws/stream');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const IP_ADDRESS = '103.145.138.78'; // Replace with your desired IP address
const PORT = 3000; // Replace with your desired port number

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.of('/stream').on('connection', stream);

server.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running at http://${IP_ADDRESS}:${PORT}`);
});
