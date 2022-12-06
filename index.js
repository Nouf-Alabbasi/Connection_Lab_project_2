const express = require('express');
const app = express();
const { instrument } = require('@socket.io/admin-ui');

let http = require('http');
let server = http.createServer(app);

app.use('/', express.static('public'));

rooms = {};
let io = require('socket.io')
io = new io.Server(server, {
    cors: {
        origin: ['https://admin.socket.io'],
        credentials: true
    }
});
instrument(io, {
    auth: false,
    mode: "development"
});


let no_of_connections = 0;
io.on('connect', (socket) => {
    console.log('New Connection:', socket.id);
    no_of_connections++;


    socket.on('room', (data) => {
        if (!rooms[data]) {
            socket.room = data;
            socket.emit('set_role', 'seeker');
            console.log(rooms);
            rooms[data] = 1;
            socket.join(data);
        }
        else if (rooms[data] == 1) {
            socket.room = data;
            socket.emit('set_role', 'hider');
            rooms[data]++;
            socket.join(data);
            io.in(data).emit('start', socket.role);
        }
        else {
            socket.emit('more_than_2', socket.id);
        }
    })



    socket.on('end', (data) => {
        io.emit('end_screen', data);
    })

    socket.on('hide', (data) => {
        io.emit('set_hiding_place', data);
        // io.emit('set_hiding_place_X', data);
        // io.emit('set_hiding_place_Y', data);
    })
    socket.on('move', (data) => {
        io.emit('move_seeker', data);
    })
    socket.on('disconnect', () => {
        console.log('Disconnected');
        rooms[socket.room]--;
    })
})

server.listen(3000, () => {
    console.log('listening on 3000...');
})