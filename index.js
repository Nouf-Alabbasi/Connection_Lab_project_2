const express = require('express');
const app = express();

let http = require('http');
let server = http.createServer(app);

app.use('/', express.static('public'));
server.listen(3000, () => {
    console.log('listening on 3000...');
})

let io = require('socket.io')
io = new io.Server(server);
let no_of_connections = 0;
io.on('connect', (socket) => {
    console.log('New Connection:', socket.id);
    no_of_connections++;
    if (no_of_connections == 1) {
        socket.role = "seeker";
    }
    else {
        socket.role = "hider";
        socket.broadcast.emit('start', 'seeker')
        socket.emit('start', socket.role);
    }

    socket.on('hide', (data) => {
        io.emit('set_hiding_place', data);
    })




    socket.on('disconnect', (socket) => {
        console.log('Disconnected');
        no_of_connections--;
    })
})